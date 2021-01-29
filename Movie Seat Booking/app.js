
$(document).ready(function() {

    $('#myTable').DataTable({
        language: {
            "sProcessing": "Обработка на резултатите...",
            "sLengthMenu": "Показване на _MENU_ резултата",
            "sZeroRecords": "Няма намерени резултати",
            "sInfo": "Показване на резултати от _START_ до _END_ от общо _TOTAL_",
            "sInfoEmpty": "Показване на резултати от 0 до 0 от общо 0",
            "sInfoFiltered": "(филтрирани от общо _MAX_ резултата)",
            "sInfoPostFix": "",
            "sSearch": "Търсене:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "Първа",
                "sPrevious": "Предишна",
                "sNext": "Следваща",
                "sLast": "Последна"
            }
        }
  
  
  
    });
  
  
  
  var d=new Date();
  var fancyString = `export${d.getDate()}`
  var imoti = /*[[${employees}]]*/ 'default';
  console.log(imoti);
  
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = d.getFullYear();
  d = mm + '/' + dd + '/' + yyyy;
  let todaysDate = document.getElementById("todaysDate");
  todaysDate.innerText = d;
  
  
  
  
  $("#expoButt").click(function(){
    $("#myTable").table2excel({
      // exclude CSS class
      exclude: ".noExl",
      exclude_img:true,
    exclude_links:true,
      name: "Ексел Експорт",
      filename: fancyString, //do not include extension
      fileext: ".xls" // file extension
    });
  });
  
     // here it starts the map part, if we dont have the map the if just passes next
  
     if(document.getElementById("mapa")){
      var mymap = L.map('mapa').setView([42.6978634, 23.3221789], 12);
      var options = {
        key: '3dd218b1b85948b38f40c3a0a43a6eeb',
        limit: 1
    };
      var control = L.Control.openCageSearch(options).addTo(mymap);
  
      var markerForMaking = [];
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoicGFjaGlydWxpcyIsImEiOiJjazU1NHgxMzIwMGJmM2tvNXBiZHV3c2U5In0.dPlSs9S0vZCFL7EdGV3fRQ'
      }).addTo(mymap);
      var detailsButton = '<button style="margin-top:15px" class="pop-button btn btn-primary btn-sm">Виж Детайли</button>';
      for (i = 0; i < imoti.length; i++) {
          let [idTemp, nameTemp, contactTemp, tempImage, tempKvar, tempType, tempDeal, tempIdeal] = [imoti[i].id,imoti[i].name,imoti[i].contact,imoti[i].picture,imoti[i].kvartal,imoti[i].type,imoti[i].deal,imoti[i].idealcs];
          let geoJsonUrl = `https://api.opencagedata.com/geocode/v1/geojson?key=3dd218b1b85948b38f40c3a0a43a6eeb&q=${imoti[i].city}&pretty=1&min_confidence=7&countrycode=BG&language=bulgarian&no_annotations=1`;
          fetch(geoJsonUrl).then(res => res.json()).then(data => {console.log(data.features[0]);L.geoJson(data.features[0], {
              onEachFeature: function(feature, layer){
                layer.bindPopup(`<b>${feature.properties['formatted']}</b><br></br> ID: ${idTemp} <br></br> Контакт  <b>${nameTemp}</b> ${contactTemp}  <br></br>${detailsButton}`).on("popupopen", () => {
                  $(".pop-button").on("click", e => {
                    e.preventDefault();
                    Swal.fire({
                      title: '<strong>Детайли</strong>',
                      imageUrl: tempImage,
                      html:  `<p><strong>ID: ${idTemp}</strong></p><p><strong>Тип сделка и Имот: ${tempDeal} ${tempType}</strong></p><p><strong>Адрес: ${feature.properties['formatted']}</strong></p><p><strong>Собственик: ${nameTemp}</strong></p><p><strong>Информация за контакт: ${contactTemp}</strong></p><p><strong>Квартал: ${tempKvar}</strong></p><p><strong>Подходящ клиент: ${tempIdeal}</strong></p>`,
                      showCloseButton: true,
                      focusConfirm: false,
                      confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Супер!',
                      confirmButtonAriaLabel: 'Thumbs up, great!',
  
                    })
                  });
                });
               }}).addTo(mymap)})
      }
     }
  
  // This file is meant to be reused for form validation.
  
  const messageRequired = 'Value is required';
  const invalidNumber = 'Invalid number entered. Please try again';
  const invalidEmail = 'Invalid email adress. Please try again';
  
  function checkRequired(valField, displayID){
      let displayHandler = document.getElementById(displayID);
  
      if(valField.value == null || valField.value == ''){
          displayHandler.innerHTML = messageRequired;
          valField.focus();
          return false;
      } else{
          return true;
      }
  }
  
  function isValidNumber(valField, displayID){
      let displayHandler = document.getElementById(displayID);
      if(isNaN(valField.value)){
          displayHandler.innerHTML = invalidNumber;
          valField.focus();
          return false;
      } else {
          displayHandler.innerHTML= '';
          return true;
      }
  }
  
  function checkEmail(valField, displayID){
      let displayHandler = document.getElementById(displayID);
      let emailFormat = '/\S+@\S+\.\S+/';
      let emailString = valField.value;
  
      if(!emailFormat.test(emailString)){
          displayHandler.innerHTML = invalidEmail;
          valField.focus();
          return false;
      } else {
          displayHandler.innerHTML = '';
          return true;
      }
  
  }
  
     $('.empButton').click(function(e){
      e.preventDefault();
      let newTaskId = document.getElementById("newTaskId");
      let href = $(this).attr('href');
      let text = $(this).text();
      console.log(text+href);
  
      if(text) {
          $.getJSON(href, function(response){
              console.log(response);
              //address id = modalAddress
              //imot id = modalId
              //duenyo id = modalName
              //contact id = modalContact
              let address = document.getElementById("modalAddress");
              let imotid = document.getElementById("modalId");
              let duenyo = document.getElementById("modalName");
              let contact = document.getElementById("modalContact");
              let currentUser = document.getElementById("currentUserName").textContent; 

              let caddress = document.createTextNode(response.city);
              let cimotid = document.createTextNode(response.id);
              let cduenyo = document.createTextNode(response.name);
              let ccontact = document.createTextNode(response.contact);
              address.innerText = caddress.textContent;
              imotid.innerText = cimotid.textContent;
              duenyo.innerText = cduenyo.textContent;
              contact.innerText = ccontact.textContent;
  
              let emptyTask = `/emptyTask?id=${imotid.innerText}&broker=${currentUser}`;
              console.log("Content is loaded into the modal");
              console.log("Starting to load empty task");
  
              $.getJSON(emptyTask, function(response){
                console.log(response);
                newTaskId.textContent= response.id;
                console.log("Content task id is loaded")
              });
  
  
          });$('.myForm #exampleModal').modal({backdrop: 'static', keyboard: false});
      }
  
  });
  
  $('.callTask').click(function(e){
    e.preventDefault();
    // now what we are doing on click Call task is> assign variables with content from user=> call the apis with this variables
    // variable Commission percentage [INPUT]
    let ccallPercent = document.getElementById("modalPercent");
    let callPercent = document.getElementById("modalPercent").value;
    // variable NEW TASK ID
    let callId = document.getElementById("newTaskId").innerText;
    // variable Imot ID,
    let commId = document.getElementById("modalId").innerText;
    // variable DESCRIPTION CALL TASK [INPUT]
    let me = document.getElementById("inputGroupSelect01");
    let callDesc = me.options[me.selectedIndex].value;
    // variable Nxt Step TASK [INPUT]
    let ccallNext = document.getElementById("modalTextarea");
    let callNext = document.getElementById("modalTextarea").value;
    // variable Finished TASK [INPUT]
    let me2 = document.getElementById("inputGroupSelect02");
    let callFinish = me2.options[me2.selectedIndex].value;
  
    let href = `/callTask/?id=${callId}&desc=${callDesc}&next=${callNext}&finish=${callFinish}`;
    let percentCommission = `/findOneToChange/?id=${commId}&comm=${callPercent}`
  
    console.log(href+ " gonna call them both  "+ percentCommission);
  
  //array of the inputs
    let inputs = [];
    inputs.push(ccallPercent,me,me2,ccallNext);
    inputs.forEach(checkRequired);
  
    if(callPercent || callFinish){
      $.getJSON(href, function(response){
        console.log(response);
        console.log("Call to update task done")
      });
      $.getJSON(percentCommission, function(response){
        console.log(response);
        console.log("Call to update commission done")
      });
  
    }
    console.log("closing modal");
    $('.myForm #exampleModal').modal('hide');
    location.reload();
  });
    //lets take care from now on on the employee view
    //we need to assign the temporal vales from the imot table
    const notFinishedTasksDiv = document.getElementById("cardNoFinishTask");
    const activeImotiDiv = document.getElementById("myActiveImoti");
    const finishedTasksDiv = document.getElementById("myFinishTasks");
    // api links
    const getNotFinishedApi = "/myNotFinish";
    const getActiveImotApi = "/myActive";
    const getFinishedApi = "/myFinished";
    // custom tables string
    const customTable = `<table class="table table-sm" id="cardTable"><th><td></td></th></table>`;
    const customTable1 = `<table class="table table-sm" id="cardTable1"><th><td></td></th></table>`
    const customTable2 = `<table class="table table-sm" id="cardTable2"><th><td></td></th></table>`
  
    notFinishedTasksDiv.innerHTML = customTable;
    activeImotiDiv.innerHTML = customTable1;
    finishedTasksDiv.innerHTML = customTable2;
  
  
  fetch(getNotFinishedApi,{method:'get'}).then(response => response.json()).then(data => {
      console.log(data);
       $('#cardTable').DataTable( {
        language: {
              "sProcessing": "Обработка на резултатите...",
              "sLengthMenu": "Показване на _MENU_ резултата",
              "sZeroRecords": "Няма намерени резултати",
              "sInfo": "Показване на резултати от _START_ до _END_ от общо _TOTAL_",
              "sInfoEmpty": "Показване на резултати от 0 до 0 от общо 0",
              "sInfoFiltered": "(филтрирани от общо _MAX_ резултата)",
              "sInfoPostFix": "",
              "sSearch": "Търсене:",
              "sUrl": "",
              "oPaginate": {
                  "sFirst": "Първа",
                  "sPrevious": "Предишна",
                  "sNext": "Следваща",
                  "sLast": "Последна"
              }
          },
            "autoWidth": true,
           searching: false,
        paging: false,
        data: data,
        "ordering": false,
            "info":     false,
        columns: [
            { data: 'id' },
            { data: 'title' },
            { data: 'description' },
            { data: 'brokerassigned' },
            { data: 'finished' },
            { data: 'nextStep' },
            { data: 'deadline' },
        ]
    } );
    }).catch(function(err){
      console.log("We have problems1>> "+err)
    });
  
   fetch(getActiveImotApi,{method:'get'}).then(response => response.json()).then(data => {
      console.log(data);
       $('#cardTable1').DataTable( {
        language: {
              "sProcessing": "Обработка на резултатите...",
              "sLengthMenu": "Показване на _MENU_ резултата",
              "sZeroRecords": "Няма намерени резултати",
              "sInfo": "Показване на резултати от _START_ до _END_ от общо _TOTAL_",
              "sInfoEmpty": "Показване на резултати от 0 до 0 от общо 0",
              "sInfoFiltered": "(филтрирани от общо _MAX_ резултата)",
              "sInfoPostFix": "",
              "sSearch": "Търсене:",
              "sUrl": "",
              "oPaginate": {
                  "sFirst": "Първа",
                  "sPrevious": "Предишна",
                  "sNext": "Следваща",
                  "sLast": "Последна"
              }
          },
            "autoWidth": true,
           searching: false,
        paging: false,
        data: data,
        "ordering": false,
            "info":     false,
        columns: [
            { data: 'id' },
            { data: 'added' },
            { data: 'assignedbr' },
            { data: 'city' },
            { data: 'deal' },
            { data: 'description' },
            { data: 'idealcs' },
            { data: 'kvartal' },
            { data: 'name' },
            { data: 'type' },
            { data: 'commission' }
        ]
    } );
    }).catch(function(err){
      console.log("We have problems2>> "+err)
    });
  
  fetch(getFinishedApi,{method:'get'}).then(response => response.json()).then(data => {
      console.log(data);
       $('#cardTable2').DataTable( {
        language: {
              "sProcessing": "Обработка на резултатите...",
              "sLengthMenu": "Показване на _MENU_ резултата",
              "sZeroRecords": "Няма намерени резултати",
              "sInfo": "Показване на резултати от _START_ до _END_ от общо _TOTAL_",
              "sInfoEmpty": "Показване на резултати от 0 до 0 от общо 0",
              "sInfoFiltered": "(филтрирани от общо _MAX_ резултата)",
              "sInfoPostFix": "",
              "sSearch": "Търсене:",
              "sUrl": "",
              "oPaginate": {
                  "sFirst": "Първа",
                  "sPrevious": "Предишна",
                  "sNext": "Следваща",
                  "sLast": "Последна"
              }
          },
            "autoWidth": true,
           searching: false,
        paging: false,
        data: data,
        "ordering": false,
            "info":     false,
        columns: [
            { data: 'id' },
            { data: 'title' },
            { data: 'description' },
            { data: 'brokerassigned' },
            { data: 'finished' },
            { data: 'nextStep' },
            { data: 'deadline' },
        ]
    } );
    }).catch(function(err){
      console.log("We have problems3>> "+err)
    });
  
      setTimeout(function(){ $('#modalQuickView').modal({backdrop: 'static', keyboard: false}); }, 3000);
  
  
  });
  