import React from 'react'
import Background from '../Background'
import LoggedInNavbar from '../Navbar/LoggedInNavbar'
import Chart from 'chart.js/auto'
import SearchBar from '../Searchbar/SearchBar'
import Post from './Feed';
import PostContent from './PostContent';
import { UserContext } from '../../context/userContext'


const ctx = 'myChart';

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});


const Homepage = () => {
  return (
    <>
      <div>
        <Background/>
        <UserContext.Provider>
          <LoggedInNavbar/> 
        </UserContext.Provider>
        <Post/>
      </div>
    </>
)};

export default Homepage