#include<bits/stdc++.h>
using namespace std;
using ll = long long;

#define int             ll
#define yes             cout<<"Yes"<<endl
#define no              cout<<"No"<<endl
#define pii             pair<int,int>
#define in(arr,n)       for(int x = 0; x < n; ++x) cin>>arr[x]
#define out(arr,n)      for(int x = 0; x < n ; ++x) cout<<arr[x]<<" "; cout << endl;
#define endl            "\n"

const int MOD = 1e9 + 7;

signed main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    cin >> s;

    if( s[0] == 'R' && (s[1] == 'M' || s[2] == 'S') ) yes;
    else if( s[1] == 'R' && s[2] == 'M' ) yes;
    else no;
    return 0;
}