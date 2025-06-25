let alloyMap = {};
let selectedElement = null;

const periodicGrid = [
  ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
  ["Li", "Be", "", "", "", "", "", "", "", "", "", "", "B", "C", "N", "O", "F", "Ne"],
  ["Na", "Mg", "", "", "", "", "", "", "", "", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
  ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
  ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
  ["Cs", "Ba", "*", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
  ["Fr", "Ra", "**", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Fl", "Lv", "Ts", "Og", "", ""]
];

fetch("alloy_visual_data_ordered.json")
  .then(res => res.json())
  .then(data => {
    alloyMap = data.alloyMap;
    renderTable();
  });

function renderTable() {
  const table = document.getElementById("periodic-table");
  table.innerHTML = "";

  periodicGrid.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    row.forEach(el => {
      const btn = document.createElement("div");
      btn.className = "element";
      btn.textContent = el;

      if (!el) {
        btn.classList.add("hidden");
      } else {
        btn.onclick = () => selectElement(el);
        applyColor(btn, el);
      }

      rowDiv.appendChild(btn);
    });

    table.appendChild(rowDiv);
  });
}

function selectElement(el) {
  selectedElement = el;
  renderTable();
}

function applyColor(btn, el) {
  if (selectedElement === el) {
    btn.classList.add("purple");
    btn.style.backgroundColor = "purple";
    btn.style.color = "white";
  } else if (!alloyMap[selectedElement] || !alloyMap[selectedElement][el]) {
    if (!Object.keys(alloyMap).includes(el)) {
      btn.style.backgroundColor = "grey";
      btn.style.color = "white";
    } else {
      btn.style.backgroundColor = "#ccc";
      btn.style.color = "black";
    }
  } else {
    const { binary, ordered } = alloyMap[selectedElement][el];
    if (binary === "no") {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    } else if (binary === "yes" && ordered === "yes") {
      btn.style.backgroundColor = "#006400"; // dark green
      btn.style.color = "white";
    } else if (binary === "yes") {
      btn.style.backgroundColor = "#90ee90"; // light green
      btn.style.color = "black";
    }
  }
}
