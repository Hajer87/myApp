import React from "react";
import "./Tab.css";

const Tab = () => {
  var table = document.querySelector(table),
    ths = table.querySelector("thead th"),
    row = table.querySelectorAll("tbody tr"),
    tBody = table.querySelector("tbody"),
    docF = document.createDocumentFragment();

  function sortMe(e) {
    var thsArray = [].slice.call(ths),
      rowArray = [].slice.call(row),
      target = e.target,
      thsIndex = thsArray.indexOf(target);

    rowArray.sort(function (a, b) {
      var tdA = a.children[thsIndex].textContent,
        tdB = b.children[thsIndex].textContent;

      if (tdA > tdB) {
        return 1;
      } else if (tdA < tdB) {
        return -1;
      } else {
        return 0;
      }
    });

    rowArray.forEach(function (row) {
      docF.appendChild(row);
    });

    tBody.appendChild(docF);
  }

  for (var i = 0; i < ths.length; i++) {
    ths[i].addEventListener("click", sortMe, false);
  }

  return (
    <div>
      <div class="container">
        <h1>Sort Table</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Joe</td>
              <td>Allen</td>
              <td>33</td>
              <td>19281</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Kowalsky</td>
              <td>63</td>
              <td>923</td>
            </tr>
            <tr>
              <td>Victor</td>
              <td>Scendell</td>
              <td>15</td>
              <td>12345</td>
            </tr>
            <tr>
              <td>Jennifer</td>
              <td>Lescott</td>
              <td>44</td>
              <td>7821</td>
            </tr>
            <tr>
              <td>Paul</td>
              <td>Finley</td>
              <td>44</td>
              <td>7821</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tab;
