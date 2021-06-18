/* 
(function(){
  var table = document.querySelector("table"),
      ths = table.querySelectorAll("thead th"),
      row = table.querySelectorAll("tbody tr"),
      tBody = table.querySelector("tbody"),
      docF = document.createDocumentFragment();
 
  function sortMe(e){
    var thsArray = [].slice.call(ths),
        rowArray = [].slice.call(row),
        target = e.target,
        thsIndex = thsArray.indexOf(target);
    
    rowArray.sort(function(a,b){
      var tdA = a.children[thsIndex].textContent,
          tdB = b.children[thsIndex].textContent;
      
      if (tdA > tdB){
        return 1;
      }else if (tdA < tdB){
        return -1;
      }else{
        return 0;
      }
    });
    
    rowArray.forEach(function(row){
      docF.appendChild(row)
    });
    
    tBody.appendChild(docF);
    
  }
  
  for (var i = 0; i < ths.length; i++){
    ths[i].addEventListener("click", sortMe, false)
  }
  
  
})()*/