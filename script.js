alert('Raih 3 Skor untuk Meraih Kemenangan!!\n Selamat Bermain.. :D');
// menangkap pilihan computer
function getPilihanComputer() {

    // menggunakan bilangan random
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const comp = getRandomInt(3);
    if (comp == 1) return 'gunting';
    if (comp == 2) return 'batu';
    return 'kertas';

}

function getHasil(comp, player) {
    if (player == comp) return 'SERI!';
    if (player == 'gunting') return (comp == 'kertas') ? 'MENANG!' : 'KALAH!';
    if (player == 'batu') return (comp == 'gunting') ? 'MENANG!' : 'KALAH!';
    if (player == 'kertas') return (comp == 'batu') ? 'MENANG!' : 'KALAH!';
}

function putar() {
    const imgComputer = document.querySelector('.img-comp');
    const gambar = ['gunting', 'batu', 'kertas'];
    let i = 0;
    const waktuMulai = new Date().getTime();

    setInterval(function() {
        if (new Date().getTime() - waktuMulai > 1000) {
            clearInterval;
            return;
        }
        imgComputer.setAttribute('src', 'img/' + gambar[i++] + '.jpg');
        if (i == gambar.length) i = 0;
    }, 100);
}

const pilihan = document.querySelectorAll('li img');
let skorComp = 0;
let skorPlayer = 0;
const whoWin = document.querySelector('.who-win');
const notifHasil = document.querySelector('.notif-hasil');
const cobaLagi = document.querySelector('.cobaLagi');

cobaLagi.addEventListener('click', function() {
    location.reload();
    return false;
});

pilihan.forEach(function(pilihan) {
    pilihan.addEventListener('click', function() {
        const pilihanComputer = getPilihanComputer();
        const pilihanPlayer = pilihan.className;
        const hasil = getHasil(pilihanComputer, pilihanPlayer);

        putar();
        setTimeout(function() {
            const imgComp = document.querySelector('.img-comp');
            imgComp.setAttribute('src', 'img/' + pilihanComputer + '.jpg');

            const info = document.querySelector('.hasil');
            info.innerHTML = hasil;
            if (hasil == 'KALAH!') {
                info.style.backgroundColor = '#db4260';
                info.style.color = 'white';
                skorComp += 1;
            }
            if (hasil == 'MENANG!') {
                info.style.backgroundColor = 'LimeGreen';
                info.style.color = 'white';
                skorPlayer += 1
            }
            if (hasil == 'SERI!') {
                info.style.backgroundColor = 'LightBlue';
                info.style.color = 'LightSlateGrey';
            }
            if (skorComp == 3) {
                notifHasil.prepend('Computer Menang, Kamu kalah :\'(');
                notifHasil.style.border = '5px solid #db4260';
                whoWin.style.display = 'inline';
                cobaLagi.style.backgroundColor = '#db4260';

            }
            if (skorPlayer == 3) {
                notifHasil.prepend('Selamat Kamu menang!!');
                notifHasil.style.border = '5px solid LimeGreen';
                whoWin.style.display = 'inline';
                cobaLagi.style.backgroundColor = 'LimeGreen';

            }

            const skorComputer = document.querySelector('.skorComp');
            const skorPlayers = document.querySelector('.skorPlayer');
            skorComputer.innerHTML = skorComp.toString();
            skorPlayers.innerHTML = skorPlayer.toString();


        }, 1000);
    });
});


console.log(whoWin);
