# TimeTracker GUI
## a web interface for the time tracker backend

compatible node version: 16.13.0 
npm install -g npm@8.2.0

run in IDE with: 
   > npm install

   > npm run serve

The interface should now be available in a browser of your choice at http://localhost:8081/


For the Docker image creation, run the following in the project root directory:
   > docker build -t alinagraf/timetrackergui:v1.0 .
   
To start the container, use:
  > docker run -it -e TIME_TRACKER_URL= 'http://localhost:8080' -p 8081:8080 -d --name docker-timetracker-vuejs  alinagraf/timetrackergui   
  
