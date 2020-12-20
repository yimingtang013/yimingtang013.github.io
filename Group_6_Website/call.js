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
        const aLen = Object.keys(data.agencies).length;
        console.log(data);
  
        if (document.contains(document.querySelector('.officelist'))) {
          document.querySelector('.officelist').remove();
        }
        // add list
        const display = document.createElement('ol');
        display.setAttribute('class', 'officelist');
        container.appendChild(display);
  
        if (data.agencies[0].hasOwnProperty('Error_Message')) {
          display.append(data.agencies[0].Error_Message);
          display.append(document.createElement('br'));
          display.append(`Here is a list of valid agencies: ${data.agencies[0].Agency}`);
        } else {
        // adds agency info
          for (let i = 0; i < aLen; i++) {
            const office = data.agencies[i];
            const agencies = document.createElement('li');
            const br = document.createElement('br');
            // add variables to list
            agencies.textContent = `Name: ${office.description}`;
            display.appendChild(agencies);
            agencies.append(br);
            agencies.append(`Address: ${office.human_address}`);
            agencies.append(document.createElement('br'));
            agencies.append(`Agency: ${office.agency}`);
          }
        }
      });
  }
  function getAll(e) {
    e.preventDefault(); // this prevents your page reloading on button click
  
    fetch('/api', {
      method: 'GET'
    })
      .then((data) => data.json())
      .then((data) => {
        const aLen = Object.keys(data.agencies).length;
        const container = document.querySelector('.listcontainer');
  
        if (document.contains(document.querySelector('.officelist'))) {
          document.querySelector('.officelist').remove();
        }
        // add list
        const display = document.createElement('ol');
        display.setAttribute('class', 'officelist');
        container.appendChild(display);
  
        // adds agency info
        for (let i = 0; i < aLen; i++) {
          const office = data.agencies[i];
          const agencies = document.createElement('li');
          const br = document.createElement('br');
          // add variables to list
          agencies.textContent = `Name: ${office.description}`;
          display.appendChild(agencies);
          agencies.append(br);
          agencies.append(`Address: ${office.human_address}`);
          agencies.append(document.createElement('br'));
          agencies.append(`Agency: ${office.agency}`);
        }
  })
}