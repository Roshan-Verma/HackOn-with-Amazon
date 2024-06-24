from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
import mysql.connector
import os
import datetime

app = Flask(__name__)

__transactionsdf=None
__offersdf=None
__pmdf=None
__model1=None
__model2=None
__le=None


def load_model():

    df_col=['user_id', 'transaction_amount', 'payment_method',  'date','success/failure']
    offers_df_col=['payment_method', 'start_date', 'end_date',  'cashbacks', 'charges']

    mydb=mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="hackonamazon",
    )

    mycursor=mydb.cursor()
    mycursor.execute("SELECT * FROM transaction")
    myresult=mycursor.fetchall()

    df = pd.DataFrame(columns=df_col)

    for x in myresult:
        new_data = pd.DataFrame([x],columns=df_col)
        df = pd.concat([df, new_data], ignore_index=True)

    mydb=mysql.connector.connect(
        host="localhost",
        user="root",
        password="password",
        database="hackonamazon",
    )

    mycursor=mydb.cursor()
    mycursor.execute("SELECT * FROM offers")
    myresult=mycursor.fetchall()

    offers_df = pd.DataFrame(columns=offers_df_col)

    for x in myresult:
        new_data = pd.DataFrame([x],columns=offers_df_col)
        offers_df = pd.concat([offers_df, new_data],    ignore_index=True)


    payment_method_counts = df.groupby(['user_id',  'payment_method']).size().reset_index(name='count')


    most_frequent_payment_method = payment_method_counts.loc    [payment_method_counts.groupby('user_id')['count'].idxmax()]


    user_payment_map = most_frequent_payment_method.set_index   ('user_id')['payment_method'].to_dict()

    df['frequently_used_payment_method'] = df['user_id'].map    (user_payment_map)
    transaction_df=df

    transaction_df['date'] = pd.to_datetime(transaction_df['date'])

    global __transactionsdf
    __transactionsdf=transaction_df

    offers_df['start_date'] = pd.to_datetime(offers_df['start_date'])
    offers_df['end_date'] = pd.to_datetime(offers_df['end_date'])
    
    global __offersdf
    __offersdf=offers_df


    merged_df = transaction_df.merge(offers_df, on='payment_method')
    merged_df = merged_df[(merged_df['date'] >= merged_df   ['start_date']) & (merged_df['date'] <= merged_df['end_date'])]
    merged_df=merged_df.drop(columns=['start_date','end_date'])


    le = LabelEncoder()
    global __le
    __le=le
    merged_df['net_benefit'] = merged_df['cashbacks'] - merged_df   ['charges']
    merged_df['success/failure']=le.fit_transform(merged_df['success/failure'])
    merged_df['success_rate'] = merged_df.groupby(['payment_method'])   ['success/failure'].transform(lambda x: x.sum() / x.count())


    merged_df['payment_method_encoded'] = le.fit_transform(merged_df    ['payment_method'])
    merged_df['frequently_used_payment_method_encoded'] = le.   fit_transform(merged_df['frequently_used_payment_method'])


    pm_df=merged_df[['payment_method','payment_method_encoded', 'net_benefit','success_rate']]
    pm_df.drop_duplicates(inplace=True)
    
    global __pmdf
    __pmdf=pm_df


    features = ['transaction_amount', 'net_benefit', 'success_rate',    'frequently_used_payment_method_encoded']
    X = merged_df[features]
    y = merged_df['payment_method_encoded']


    X_train, X_test, y_train, y_test = train_test_split(X, y,   test_size=0.2, random_state=42)


    global __model1
    __model1 = RandomForestClassifier(n_estimators=100,     random_state=42)
    __model1.fit(X_train, y_train)


    features2 = ['transaction_amount', 'net_benefit', 'success_rate']
    X2 = merged_df[features2]
    y2 = merged_df['payment_method_encoded']

    X_train, X_test, y_train, y_test = train_test_split(X2, y2,  test_size=0.2, random_state=42)


    global __model2
    __model2 = RandomForestClassifier(n_estimators=100,   random_state=42)
    __model2.fit(X_train, y_train)


def get_frequently_used_payment_method(user_id, transaction_df):
    user_transactions = transaction_df[transaction_df['user_id'] == user_id]
    user_transactions=user_transactions.sort_values(by=list(user_transactions.columns), ascending=[False] * len(user_transactions.columns))
    if not user_transactions.empty:
        return user_transactions['frequently_used_payment_method'].mode()[0]
    else:
        return None
    
amt = 0

def prediction_fun(transaction):
    
    load_model()
    
    transaction_df=__transactionsdf
    offers_df=__offersdf
    model1=__model1
    model2=__model2
    pm_df=__pmdf
    
    user_id = transaction['user_id']
    frequently_used_payment_method = get_frequently_used_payment_method(user_id, transaction_df)
    
    transaction = pd.DataFrame([transaction])
    transaction['date'] = pd.to_datetime(transaction['date'])
    transaction['success/failure'] = np.where(transaction['success/failure'] == 'success', 1, 0)

    if frequently_used_payment_method!=None:
        transaction['frequently_used_payment_method'] = frequently_used_payment_method
    
    current_offers = offers_df[(offers_df['start_date'] <= transaction['date'].values[0]) & (offers_df['end_date'] >= transaction['date'].values[0])]

    le = __le
    
    if frequently_used_payment_method:
        transaction['frequently_used_payment_method_encoded'] = le.transform([transaction['frequently_used_payment_method'].values[0]])

    repeated_row = pd.concat([transaction] * len(current_offers), ignore_index=True)
    transaction = pd.concat([current_offers, repeated_row], axis=1)
    
    transaction['net_benefit'] = transaction['cashbacks'] - transaction['charges']
    
    transaction['success_rate'] = transaction.groupby(['payment_method'])['success/failure'].transform(lambda x: x.sum() / x.count())

    if frequently_used_payment_method==None:
        features = ['transaction_amount', 'net_benefit', 'success_rate']
    else:
        features= ['transaction_amount', 'net_benefit', 'success_rate', 'frequently_used_payment_method_encoded']
    feature_values = transaction[features].values

    if frequently_used_payment_method!=None:
        predicted_payment_method_encoded = model1.predict(feature_values)
    else:
        predicted_payment_method_encoded = model2.predict(feature_values)
 
    filtered_df = pm_df[pm_df['payment_method_encoded'].isin(predicted_payment_method_encoded)]

    sorted_filtered_df = filtered_df.set_index('payment_method_encoded').loc[predicted_payment_method_encoded].reset_index()
    pred_df=sorted_filtered_df
    
    payment_method_counts = pred_df['payment_method'].value_counts()
    
    max_frequency = payment_method_counts.max()
    
    most_frequent_methods = payment_method_counts[payment_method_counts == max_frequency].index.tolist()

    filtered_df = pred_df[pred_df['payment_method'].isin(most_frequent_methods)]

    highest_success_rate = filtered_df['success_rate'].max()
    highest_success_methods = filtered_df[filtered_df['success_rate'] == highest_success_rate]

    if highest_success_methods.shape[0] > 1:
        highest_net_benefit = highest_success_methods['net_benefit'].max()
        final_method = highest_success_methods[highest_success_methods['net_benefit'] == highest_net_benefit]['payment_method'].iloc[0]
    else:
        final_method = highest_success_methods['payment_method'].iloc[0]

    return final_method

@app.route('/predict', methods=['GET','POST'])
def predict_payment_method():
    today = datetime.date.today()
    transaction = {
        'user_id': 1,
        'transaction_amount': amt,
        'date': today.strftime("%Y-%m-%d"),
        'success/failure': 'success'
    }
    recommended_method = prediction_fun(transaction)
    return jsonify({'recommended_payment_method': recommended_method})

@app.route('/api/data', methods=["POST","GET"])
def get_data():
	if( request.method == 'POST'):
		amt = request.json['totalPrice']
		# print(amt)
		return jsonify({'message' : 'Data recieved'})
	else:
		return jsonify({'message' : 'Data Not recieved'})
	

# Running app
if __name__ == '__main__':
	app.run(host = '0.0.0.0',debug=True)
