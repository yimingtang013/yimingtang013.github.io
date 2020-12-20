function getMap(e) {
    e.preventDefault(); 
    const target = document.querySelector('#labForm');
    const btn = document.querySelector('#mapmBtn');
    const container = document.querySelector('.listcontainer');
  
    const formToSend = new FormData(target);
  
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formToSend))
    })
      .then((data) => data.json()) // note: we didn't send JSON, so there's no JSON to get.
      .then((data) => {
        console.log(data.locations[0].hasOwnProperty('Error_Message'));
        const aLen = Object.keys(data.locations).length;
        const display = document.createElement('ol');
        display.setAttribute('class', 'officelist');
        if (data.locations[0].hasOwnProperty('Error_Message')) {
          layerGroup.clearLayers();
          if (document.contains(document.querySelector('.officelist'))) {
            document.querySelector('.officelist').remove();
          }
          container.appendChild(display);
          display.append(data.locations[0].Error_Message);
          display.append(document.createElement('br'));
          display.append(`Here is a list of valid agencies: ${data.locations[0].Agency}`);
        }
      });
  }
  
  function sendForm(e) {
    e.preventDefault(); // this prevents your page reloading on button click
    const target = document.querySelector('#labForm');
    const btn = document.querySelector('#formBtn');
    const container = document.querySelector('.listcontainer');
    
    const formToSend = new FormData(target);
  
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formToSend)),
    })
      .then((data) => data.json())
      .then((data) => {
        const aLen = Object.keys(data.locations).length;
        console.log(data);
            for (let i = 0; i < aLen; i++) {
            const office = data.agencies[i];
            const agencies = document.createElement('li');
            const br = document.createElement('br');
  
            agencies.textContent = `Name: ${office.description}`;
            display.appendChild(agencies);
            agencies.append(br);
            agencies.append(`Address: ${office.human_address}`);
            agencies.append(document.createElement('br'));
            agencies.append(`Agency: ${office.agency}`);
          }
        }
  
  ,

  function getAll(e) {
    e.preventDefault(); 
  
    fetch('/api', {
      method: 'GET'
    })
      .then((data) => data.json())
      .then((data) => {
        const aLen = Object.keys(data.locations).length;
        const container = document.querySelector('.listcontainer');
  
        if (document.contains(document.querySelector('.locationlist'))) {
          document.querySelector('.locationlist').remove();
        }
        const display = document.createElement('ol');
        display.setAttribute('class', 'locationlist');
        container.appendChild(display);
  
        for (let i = 0; i < aLen; i++) {
          const locations = data.locations[i];
          agencies.textContent = `Name: ${locations.description}`;
          display.appendChild(locations);
          agencies.append(br);
          agencies.append(document.createElement('br'));
          agencies.append(`Location: ${locations.locations}`);
        }
  })
}