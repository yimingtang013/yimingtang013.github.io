const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function processDataForFrontEnd(req, res) {
  const baseURL = 'data.princegeorgescountymd.gov/Government/Polling-Places/e2wd-vu2n'; 
  const polling = req.body.locations.toUpperCase();
  console.log(polling);
  const packet = ({ 'locations': [] });
  if (!valid.includes(polling)) {
    packet.locations.push({
      'Error_Message': `Sorry we could not find a Polling Location for ${req.polling.locations}`,
      'Polling': valid
    });
    res.json(packet);
  } else {
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
      
        for (let i = 0; i < data.length; i++ ) {
          if (data[i].locations === locations) {
            const locations = data[i];
            const { polling } = locations;
            packet.locations.push({
              'description': locations.description,
              'long': locations.polling.longitude,
              'lat': locations.polling.latitude
            });
          }
        }
        console.log(packet);
        res.json(packet); 
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
  }
}
function processDataForList(req, res) {
  const baseURL = 'data.princegeorgescountymd.gov/Government/Polling-Places/e2wd-vu2n'; 
  const polling = req.body.polling.toUpperCase();
  console.log(polling);
  const packet = ({ 'locations': [] });
  if (!valid.includes(locations)) {
    packet.locations.push({
      'Error_Message': `Sorry we could not find a PG County Polling location for ${req.body.locations}`,
      'Polling': valid
    });
    res.json(packet);
  } else {
    fetch(baseURL)
      .then((r) => r.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++ ) {
          if (data[i].polling === polling) {
            const polling = data[i];
            packet.polling.push({
              'description': locations.description,
=              'polling': polling.locations
            });
          }
        }
        console.log(packet);
        res.json(packet); 
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
  }
}

function retrieveAll(res) {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/baxv-ntrj.json'; 
  const packet = ({ 'locations': [] });

  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      // process data
      for (let i = 0; i < data.length; i++ ) {
        const polling = data[i];
        const { polling } = polling;
        packet.locations.push({
          'description': polling.description,
          'long': locations.polling.longitude,
          'lat': locations.polling.latitude
        });
      }
      console.log(packet);
      res.json(packet); 
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
}

app
  .route('/api')
  .get((req, res) => {
    console.log('all');
    retrieveAll(res);
  })
  .post((req, res) => {
    console.log('list');
    processDataForList(req, res);
  })
  .put((req, res) => {
    console.log('map');
    processDataForFrontEnd(req, res);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));