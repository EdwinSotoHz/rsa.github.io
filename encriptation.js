var calcN = function (p, q) {
    var n = p * q;
    return n;
};
var calcPhiN = function (p, q) {
    var phiN = (p - 1) * (q - 1);
    return phiN;
};
var MCD = function (a, b) {
    while (b !== 0) {
        var bOrnal = b;
        b = a % b;
        a = bOrnal;
    }
    return a;
};
var MCDTable = function (phiN, e) {
    var table = [];
    e.forEach(function (element) {
        if (MCD(phiN, element) == 1) {
            table.push([phiN, element]);
        }
    });
    return table;
};
var calcD = function (phiN, e) {
    var d = 0;
    for (var k = 1; k <= e; k++) {
        var dValue = (1 + k * phiN) / e;
        // console.log(dValue)
        if ((dValue % 1) === 0) {
            d = dValue;
        }
    }
    return d;
};
var convertMessage = function (message) {
    var m = message.split('');
    var me = [];
    var number = '';
    var numsAlf = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'
    ];
    m.forEach(function (element) {
        if (/^[0-9]$/.test(element)) {
            number += element;
        }
        else if (element == ' ') {
            me.push(BigInt(-1));
        }
        else if (element == '.') {
            me.push(BigInt(number));
            me.push(BigInt(-2));
            number = '';
        }
        else {
            me.push(BigInt(numsAlf.indexOf(element)));
        }
    });
    if (/[0-9]/.test(message)) {
        me.push(BigInt(number));
    }
    return me;
};
var calcCM = function (num, ed, n) {
    // Calcula num^ed % n utilizando BigInt
    var result = BigInt(1);
    for (var i = BigInt(0); i < ed; i++) {
        result = (result * num) % n;
    }
    return result.toString();
};
var cPrintable = function (nums, e, n) {
    var cArray = [];
    if (nums.includes(BigInt(-2))) {
        var numPE = nums[0];
        var numPD = nums[2];
        var enc = calcCM(BigInt(numPE), BigInt(e), BigInt(n)) + '.' + calcCM(BigInt(numPD), BigInt(e), BigInt(n));
        cArray.push("<i>C = ".concat(numPE, ".").concat(numPD, "<sup>").concat(e, "</sup> Mod(").concat(n, ")</i> = ").concat(enc, "<br>"));
    }
    else {
        nums.forEach(function (num) {
            if (num == BigInt(-1)) {
                cArray.push(' ');
            }
            else {
                cArray.push("<i>C = ".concat(num, "<sup>").concat(e, "</sup> Mod(").concat(n, ")</i> = ").concat(calcCM(BigInt(num), BigInt(e), BigInt(n)), "<br>"));
            }
        });
    }
    return cArray;
};
var mPrintable = function (nums, e, d, n) {
    var cArray = [];
    if (nums.includes(BigInt(-2))) {
        var numPE = nums[0];
        var numPD = nums[2];
        var num1 = calcCM(BigInt(numPE), BigInt(e), BigInt(n));
        var num2 = calcCM(BigInt(numPD), BigInt(e), BigInt(n));
        var desenc = calcCM(BigInt(num1), BigInt(d), BigInt(n)) + '.' + calcCM(BigInt(num2), BigInt(d), BigInt(n));
        cArray.push("<i>M = ".concat(num1, ".").concat(num2, "<sup>").concat(d, "</sup> Mod(").concat(n, ")</i> = ").concat(desenc, "<br>"));
    }
    else {
        nums.forEach(function (num) {
            if (num == BigInt(-1)) {
                cArray.push(' ');
            }
            else {
                var num1 = parseFloat(calcCM(BigInt(num), BigInt(e), BigInt(n)));
                cArray.push("<i>M = ".concat(num1, "<sup>").concat(d, "</sup> Mod(").concat(n, ")</i> = ").concat(parseFloat(calcCM(BigInt(num1), BigInt(d), BigInt(n))), "<br>"));
            }
        });
    }
    return cArray;
};
var txtP = document.getElementById('txtP');
var txtQ = document.getElementById('txtQ');
var btnCalcular = document.getElementById('btnCalcular');
var p = 0;
var q = 0;
var n = 0;
var phiN = 0;
var tableMCDE = [];
var eArray = [];
var e = 0;
var d = 0;
var lblPHIE = document.querySelectorAll('.lblPHIE');
var lblN = document.querySelectorAll('.lblN');
if (btnCalcular != null) {
    btnCalcular.addEventListener('click', function () {
        if (tbMCD != null) {
            tbMCD.innerHTML = "\n            <tr>\n                <th colspan=\"2\">MCD(\u03C6(n), e) = 1</th>\n            </tr>\n            <tr>\n                <th>\u03C6(n)</th>\n                <th>e</th>\n            </tr>\n            ";
        }
        if ((txtP != null) && (txtQ != null)) {
            p = 0;
            q = 0;
            n = 0;
            phiN = 0;
            tableMCDE = [];
            eArray = [];
            e = 0;
            d = 0;
            p = parseInt(txtP.value);
            q = parseInt(txtQ.value);
            n = calcN(p, q);
            phiN = calcPhiN(p, q);
            for (var i = 2; i < phiN; i++) {
                eArray.push(i);
            }
            lblN.forEach(function (element) {
                element.textContent = n.toString();
            });
            lblPHIE.forEach(function (element) {
                element.textContent = phiN.toString();
            });
            tableMCDE = MCDTable(phiN, eArray);
            createTableMCD(tableMCDE);
        }
    });
}
var tbMCD = document.getElementById('mcd');
var createTableMCD = function (tableMCD) {
    tableMCD.forEach(function (element) {
        var row = null;
        row = document.createElement('tr');
        var col1 = document.createElement('td');
        col1.textContent = element[0].toString();
        row.appendChild(col1);
        var col2 = document.createElement('td');
        col2.innerHTML = "<label><input type=\"radio\" name=\"opcion\" value=\"".concat(element[1], "\">").concat(element[1], "</label>");
        row.appendChild(col2);
        if (tbMCD != null) {
            tbMCD.appendChild(row);
        }
    });
    var radioButtons = document.querySelectorAll('input[type="radio"][name="opcion"]');
    if (radioButtons != null) {
        radioButtons.forEach(function (radioButton) {
            radioButton.addEventListener('change', function () {
                btnEncrypt.disabled = false;
                if (this.checked) {
                    // console.log(`Opción: ${this.value}`);
                    e = this.value;
                    d = calcD(phiN, e);
                    setValues();
                }
            });
        });
    }
};
var lblE = document.querySelectorAll('.lblE');
var lblD = document.querySelectorAll('.lblD');
var setValues = function () {
    if (lblN != null && lblPHIE != null && lblE != null && lblD != null) {
        lblN.forEach(function (element) {
            element.textContent = n.toString();
        });
        lblPHIE.forEach(function (element) {
            element.textContent = phiN.toString();
        });
        lblE.forEach(function (element) {
            element.textContent = e.toString();
        });
        lblD.forEach(function (element) {
            element.textContent = d.toString();
        });
    }
};
var toggleBtn = document.getElementById('toggleBtn');
var encOptional = document.getElementById('enc-optional');
var mode = document.getElementById('mode');
var isText = true;
toggleBtn.addEventListener('change', function () {
    if (encOptional != null && mode != null) {
        if (this.checked) {
            encOptional.style.height = '0';
            mode.textContent = 'Número';
            isText = false;
        }
        else {
            encOptional.style.height = 'auto';
            mode.textContent = 'Texto';
            isText = true;
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var authorDiv = document.createElement("div");
    authorDiv.setAttribute("id", "ath");
    document.body.appendChild(authorDiv);
});
var btnEncrypt = document.getElementById('btnEncrypt');
var txtM = document.getElementById('txtM');
var mathM = document.getElementById('mathM');
var mathC = document.getElementById('mathC');
var lblME = document.getElementById('lblME');
var lblMO = document.getElementById('lblMO');
if (btnEncrypt != null && mathM != null && mathC != null && txtM != null) {
    btnEncrypt.addEventListener('click', function () {
        var originalValues = [];
        var strC = '';
        var strM = '';
        originalValues = convertMessage(txtM.value);
        var originalValuesBigInt = originalValues.map(function (num) { return BigInt(num); });
        if (isText) {
            if (lblMO != null && lblME != null) {
                lblMO.textContent = txtM.value;
                lblME.textContent = originalValues.toString();
            }
        }
        console.log(originalValuesBigInt);
        strC = '';
        cPrintable(originalValuesBigInt, BigInt(e), BigInt(n)).forEach(function (element) {
            strC += element;
        });
        mathC.innerHTML = strC;
        strM = '';
        mPrintable(originalValuesBigInt, BigInt(e), BigInt(d), BigInt(n)).forEach(function (element) {
            strM += element;
        });
        mathM.innerHTML = strM;
    });
}
