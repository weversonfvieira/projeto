(function(){
    
  // Inicia o firebase Firebase
  var config = {
     apiKey: "AIzaSyDGHALOl-sgYq5EYfuPzNelr-iXU5aXuuI",
     authDomain: "projeto-edb07.firebaseapp.com",
     databaseURL: "https://projeto-edb07-default-rtdb.firebaseio.com/",
     storageBucket: "projeto-edb07.appspot.com",
     messagingSenderId: "91109712719"
  };
  firebase.initializeApp(config);
 
  var db = firebase.database();
 
  // Cria os listeners dos dados no firebase
  var tempRef = db.ref('sala/temperatura');
  var umidRef = db.ref('sala/umidade');
  var distRef = db.ref('sala/distancia');
  var lumRef = db.ref('sala/luminosidade');
 
  var lampRef = db.ref('sala/set_luminosidade');
  var setPortaRef = db.ref('sala/set_porta');
  var setArRef = db.ref('sala/set_ar');
  var setMultimidiaRef = db.ref('sala/set_multimidia');
 
  // Registra as funções que atualizam os gráficos e dados atuais da telemetria
  tempRef.on('value', onNewData('currentTemp', 'tempLineChart' , 'Temperatura', 'C°'));
  umidRef.on('value', onNewData('currentUmid', 'umidLineChart' , 'Umidade', '%'));
  distRef.on('value', onNewData('currentDist', 'distLineChart' , 'Distancia', ''));
  lumRef.on('value', onNewData('currentLum', 'lumLineChart' , 'Luminosidade', ''));
 
 
  // Registrar função ao alterar valor
  var currentLampValue = false;
  lampRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentLamp')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentLampValue = !!value;
  });
 
  var currentSetPorta = false;
  setPortaRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentSetPorta')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentSetPorta = !!value;
  });
 
  var currentMultimidia = false;
  setMultimidiaRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentMultimidia')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentMultimidia = !!value;
  });
 
  var currentAr = false;
  setArRef.on('value', function(snapshot){
    var value = snapshot.val();
    var el = document.getElementById('currentAr')
    if(value){
      el.classList.add('amber-text');
    }else{
      el.classList.remove('amber-text');
    }
    currentAr = !!value;
  });
 
  // Registrar função de click
  var btnLamp = document.getElementById('btn-lamp');
  btnLamp.addEventListener('click', function(evt){
    currentLampValue == true ? lampRef.set(0) : lampRef.set(1);
  });
 
  var btnPorta = document.getElementById('btn-porta');
  btnPorta.addEventListener('click', function(evt){
    currentSetPorta == true ? setPortaRef.set(0) : setPortaRef.set(1);
  });
 
  var btnMultimiidia = document.getElementById('btn-multimidia');
  btnMultimiidia.addEventListener('click', function(evt){
    currentMultimidia == true ? setMultimidiaRef.set(0) : setMultimidiaRef.set(1);
  });
 
  var btnAr = document.getElementById('btn-ar');
  btnAr.addEventListener('click', function(evt){
    currentAr == true ? setArRef.set(0) : setArRef.set(1);
  });
})();
 
// Retorna uma função que de acordo com as mudanças dos dados
// Atualiza o valor atual do elemento, com a metrica passada (currentValueEl e metric)
// e monta o gráfico com os dados e descrição do tipo de dados (chartEl, label)
function onNewData(currentValueEl, chartEl, label, metric){
  return function(snapshot){
    var readings = snapshot.val();
    if(readings){
        var currentValue;
        var data = [];
        for(var key in readings){
          currentValue = readings[key]
          data.push(currentValue);
        }
 
        document.getElementById(currentValueEl).innerText = currentValue + ' ' + metric;
        buildLineChart(chartEl, label, data);
    }
  }
}
 
// Constroi um gráfico de linha no elemento (el) com a descrição (label) e os
// dados passados (data)
function buildLineChart(el, label, data){
  var elNode = document.getElementById(el);
  new Chart(elNode, {
    type: 'line',
    data: {
        labels: new Array(data.length).fill(""),
        datasets: [{
            label: label,
            data: data,
            borderWidth: 1,
            fill: false,
            spanGaps: false,
            lineTension: 0.1,
            backgroundColor: "#F9A825",
            borderColor: "#F9A825"
        }]
    }
  });
}
