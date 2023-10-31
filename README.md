# Transfer-App

## 💰 Introduction
<img width="1000" alt="截圖 2023-10-30 上午10 44 08" src="https://github.com/phoenix850508/transfer-app/assets/121414639/ed76a1bd-82bf-456a-994a-2a0145ad63d6">
<img width="1000" alt="截圖 2023-10-30 上午10 44 22" src="https://github.com/phoenix850508/transfer-app/assets/121414639/2c34f27a-3dba-4b09-acc0-98c72c628f48">
<img width="1000" alt="截圖 2023-10-30 上午10 44 41" src="https://github.com/phoenix850508/transfer-app/assets/121414639/44868854-41ac-4560-bbb2-9d98c3abbcff">
<img width="494" alt="截圖 2023-10-30 上午10 45 14" src="https://github.com/phoenix850508/transfer-app/assets/121414639/9d982c4e-df87-4e94-8d65-2f0849c7c354">

This side project is built mainly to practice Redux, Firebase and TailwindCSS, it is a payment applications for users to interact with one another, and in real-time sees the update on their account balance, public transaction timeline, and notifications from others.
You are more than welcome to try transfer and request in this app: https://phoenix850508.github.io/transfer-app/

The reference of this app's layout is from an [educational payment application](https://github.com/cypress-io/cypress-realworld-app) that I saw online.
The original idea of that educational payment application was to teach how to make unit/e2e testing. Though due to the time constrains,
testings may not be possible for me in a short period of time, so the primary goal of this project is to strengthen the knowledge of Redux, Firebase, and TailwindCSS by building this project.

## Features
- User can signup/login to join this world of payment application
- User can view all the public transactions in chronological order in the home page
- User can view a specific date's transactions in the public timeline
- User can send a request or pay to selected users available in this application
- User can search by username, email or account number to conduct a new transaction
- The account balance in the dashboard will be udpated in both client-side and backend-side instantly if any actions were taken
- User can edit their own profile picture and username
- User will be notified when other users sends requests or payments
- Notifications are popped up when there's a pending payment to be resolved
- User can decide whether to accept or decline the pending payment
- RWD application

## Test accounts
account: user1@example.com
<br>
password: 1234567
<br>
<br>
account: user2@example.com
<br>
password: 1234567
<br>
<br>
account: user3@example.com
<br>
password: 1234567

## 🔧 Specs
- Node 15.9.0,
- clsx 2.0.0,
- firebase 10.5.0,
- react 18.2.0,
- reduxjs/toolkit 1.9.7,
- react-redux 8.1.3,
- redux 4.2.1,
- tailwindcss 3.3.3,
- javascript-time-ago 2.5.9,

## Intallation
1. Please ensure that Node.js and npm are well installed in your local environment.
2. Find a folder where you want to put this project, open Terminal, and run the command for cloning:
<br> `git clone https://github.com/phoenix850508/transfer-app.git`
3. Open your terminal, and change the directory to the transfer-app folder. To do this, enter:
<br> `cd transfer-app`
4. Run the command to install all necessary npms. Enter:
<br> `npm install`
5. You should see `webpack compiled successfully` in your terminal
6. Press "ctrl + c" in Terminal if you want to stop running the project.



