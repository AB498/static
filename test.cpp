#include<iostream>
#include<vector>
using namespace std;
int main()
{
    vector<int> vec1(10);
    vector<int>vec2(10,20);
    vec1.push_back(10);
    vec1.push_back(20);
    cout<<vec1.at(0)<<"\n";
    cout<<vec2.at(1);
}