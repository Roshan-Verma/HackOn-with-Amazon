import React, { useState, useEffect } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './budget.css';
import axios from 'axios';
import PieChart from './PieChart.jsx';

const Budget = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [budgetAmount, setBudgetAmount] = useState('');
  const [spendAmount, setSpendAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = () => {
    axios.post("http://localhost:5000/getBudgetLimit", { user_id: 1 })
      .then((response) => {
        const { budget_limit, spend_amount } = response.data;
        setSpendAmount(spend_amount);
        setRemainingAmount(budget_limit - spend_amount);
      })
      .catch((error) => {
        setSpendAmount(0);
        setRemainingAmount(0);
        console.log(error);
      });
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBudgetAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budgetAmount && selectedDate) {
      const formattedDate = selectedDate.toISOString().slice(0, 19).replace('T', ' ');
      axios.post("http://localhost:5000/budgetLimit", {
        user_id: 1,
        amount: budgetAmount,
        valid_till: formattedDate
      })
        .then((response) => {
          alert(`Budget Amount: ${budgetAmount}\nValid Till: ${selectedDate}`);
          fetchBudget();
        })
        .catch((error) => {
          console.log(error);
          alert("Failed!")
        });
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the budget?")) {
      axios.post("http://localhost:5000/resetBudget", { user_id: 1 })
        .then((response) => {
          alert("Budget reset successfully");
          setSpendAmount(0);
          setRemainingAmount(0);
          setBudgetAmount('');
          setSelectedDate(null);
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to reset budget")
        });
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="label">Enter Budget Amount:</span>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Budget Amount"
              value={budgetAmount}
              onChange={handleBudgetChange}
              required
            />
          </div>
          <div className="input-group">
            <span className="label">Valid Till:</span>
            <Datepicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              className="datepicker"
              customInput={<input placeholder="Enter Date" className="input-field" required/>}
              dayClassName={date => date.getDate() === (selectedDate?.getDate() || 0) ? 'selected-date' : ''}
            />
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              disabled={!budgetAmount || !selectedDate}
            >
              Submit
            </button>
            <button type="button" onClick={handleReset} className="reset-button">
              Reset Budget
            </button>
          </div>
        </form>
      </div>
      <div className='container'>
        <h2>Budget Overview</h2>
        <PieChart spendAmount={spendAmount} remainingAmount={remainingAmount} />
      </div>
    </>
  );
}

export default Budget;
