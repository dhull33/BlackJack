
// Card constructor
function Card(image){
    this.image = image;
    this.suit = this.image[8];

    if (this.image[7] === 'J'){
        this.faceValue = 11;
        this.pointValue = 10;
    }
    else if (this.image[7] === 'Q'){
        this.faceValue = 12;
        this.pointValue = 10;
    }
    else if (this.image[7] === 'K') {
        this.faceValue = 13;
        this.pointValue = 10;
    }
    else if (this.image[7] === 'A') {
        this.faceValue = 1;
        this.pointValue = 11;
    }
    else if (this.image[7] === '1') {
        this.faceValue = 10;
        this.pointValue = 10;
        this.suit = this.image[9];
    }
    else {
        this.pointValue = Number(this.image[7]);
        this.faceValue = Number(this.image[7]);
    }
};





function shuffleAndDraw() {
    this.deck = ['images/2C.jpg', 'images/2D.jpg', 'images/2H.jpg', 'images/2S.jpg',
        'images/3C.jpg', 'images/3D.jpg', 'images/3H.jpg', 'images/3S.jpg',
        'images/4C.jpg', 'images/4D.jpg', "images/4H.jpg", "images/4S.jpg",
        'images/5C.jpg', "images/5D.jpg", "images/5H.jpg", "images/5S.jpg",
        'images/6C.jpg', "images/6D.jpg", "images/6H.jpg", "images/6S.jpg",
        'images/7C.jpg', "images/7D.jpg", "images/7H.jpg", "images/7S.jpg",
        'images/8C.jpg', "images/8D.jpg", "images/8H.jpg", "images/8S.jpg",
        'images/9C.jpg', "images/9D.jpg", "images/9H.jpg", "images/9S.jpg",
        'images/10C.jpg', "images/10D.jpg", "images/10H.jpg", 'images/10S.jpg',
        'images/JC.jpg', 'images/JD.jpg', 'images/JH.jpg', 'images/JS.jpg',
        'images/QC.jpg', 'images/QD.jpg', 'images/QH.jpg', 'images/QS.jpg',
        'images/KC.jpg', 'images/KD.jpg', 'images/KH.jpg', 'images/KS.jpg',
        "images/AC.jpg", "images/AD.jpg", "images/AH.jpg", "images/AS.jpg"]

        var shuffled = [];

        for (var x = this.deck.length; x > 0;) {
            var ranCard = Math.floor(Math.random() * 52);

            if (shuffled.indexOf(this.deck[ranCard]) === -1){
                shuffled.push(this.deck[ranCard]);
                x--;
            }
            else{
                continue;
            }
        }

        var fullDeck = []
        for (var i in shuffled) {
            var myCard = new Card(shuffled[i]);
            fullDeck.push(myCard);
        }


    this.shuffledDeck = fullDeck;

};


//var deck = new shuffleAndDraw();

function uniqueCard(){
    var deck = new shuffleAndDraw();

    var dealtCards = [];
    var drawn = Math.floor(Math.random()*52);
    var unique = deck.shuffledDeck[drawn];

    for(var j = deck.shuffledDeck.length; j > 0; j--){
        if (dealtCards.indexOf(unique) == -1){
            dealtCards.push(unique);
            break;
        }else{
            continue;
        }
    }
    return unique;
};


/*
Bet buttons ==> Could be useful in the future
$('.btn-primary').on('click', function(){
    var $button = $(this);

    var oldValue = $button.parent().find('input').val();

    if ($button.text() == '+' && oldValue <= 500) {
        var newValue = parseFloat(oldValue) + 5;
    }
    else {


        if (oldValue > 5) {
            var newValue = parseFloat(oldValue) - 5;
        }
        else{
            newValue = 0;
        }
    }

    $button.parent().find('input').val(newValue);
})

*/

$('#hit-button').hide();
$('#stand-button').hide();

// Deal Button
$('#deal-button').on('click', function () {

    //Dealer's first card
    var dealCar = uniqueCard();
    $('#d1').attr('src', dealCar['image']);
    dealerPoints = dealCar['pointValue'];
    $('#dealer-points').text(dealerPoints);

    //Player's first two cards
    var play1 = uniqueCard();
    var play2 = uniqueCard();
    $('#p1').attr('src', play1['image']);
    $('#p2').attr('src', play2['image']);
    playerPoints = play1['pointValue'] + play2['pointValue'];
    if (play1['suit'] == 'A' && play2['suit'] == 'A') {
        playerPoints = 12;
        $('#player-points').text(playerPoints);
    }
    else {
        $('#player-points').text(playerPoints);
    }

    if (playerPoints == 21) {
        $('#messages').text('You Win!');
        setTimeout(location.reload(), 3000);
    }
    else {
        $('#messages').text("Press Hit or Stand");
        $('#deal-button').hide();
        $('#hit-button').show();
        $('#stand-button').show();
    }


});






/* The hit function generates a new player card and adds its pointValue to player's points. */

$('#hit-button').click(function () {
    //Player's third card
    var play3 = uniqueCard();
    var pCard3 = document.createElement('img');
    pCard3.setAttribute('src', play3['image']);
    pCard3.setAttribute('class', 'resize');


    //Get parent node with id = 'pCards'
    $('#pCards').append(pCard3);


    if (play3['suit'] == 'A' && playerPoints > 10) {
        playerPoints += 1;
        $('#player-points').text(playerPoints);
    } else {
        playerPoints += play3['pointValue'];
        $('#player-points').text(playerPoints);
    }

    if (playerPoints > 21) {
        $('#messages').text('Bust!');
        setTimeout(reLoad, 2500);
    }
    else if (playerPoints == 21) {
        $('#messages').text('Player Wins!');

        setTimeout(reLoad, 2500);

    }
});





$('#stand-button').click(function(){
    $('#hit-button').hide();
    var deal2 = uniqueCard();

    $('#d2').attr('src', deal2['image']);
    dealerPoints += deal2['pointValue']
    $('#dealer-points').text(dealerPoints);

    var noDCards = 0;
    while (dealerPoints < 17) {
        var deal3 = uniqueCard();
        var dealImage = document.createElement('img');
        dealImage.setAttribute('src', deal3['image']);
        dealImage.setAttribute('class', 'resize');

        $('#cards').append(dealImage);

        dealerPoints += deal3['pointValue'];
        $('#dealer-points').text(dealerPoints);
        noDCards ++
    }

    $('#messages').show();

    if (dealerPoints == 21 && playerPoints < 21){
        $('#messages').text('Dealer Wins');
        setTimeout(reLoad, 2500);

    }

    else if (dealerPoints > playerPoints && dealerPoints <= 21){
        $('#messages').text("Dealer Wins");
        setTimeout(reLoad, 2500);

    }
    else if (playerPoints > dealerPoints && playerPoints <= 21){
        $('#messages').text('Player Wins!');
        setTimeout(reLoad, 2500);

    }
    else if (dealerPoints > 21 && playerPoints < 21){
        $("#messages").text("Dealer Bust");
        setTimeout(reLoad, 2500);
    }
    else{
        $("#messages").text("Push!");
        setTimeout(reLoad, 2500);
    }

    });



function reLoad(){
    location.reload();
};










