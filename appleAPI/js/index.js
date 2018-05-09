var apiUrl = 'https://itunes.apple.com';

var allVideo = [];
console.log("APIURL=",apiUrl, allVideo);
var $videoList = $('.list-group'),
	$videoInfo = $('.description'),
	$formSearch = $('#form-search');

$videoList.hide();  //список результатов поиска
$('input[name="jquery"]').focus(); //автофокус на поле ввода

$formSearch.on('submit', function(event) {
	event.preventDefault();
    $videoList.empty()  //очищяем найденный список при повторном поиске
	var queryString = $('[name=query]', this).val(); //получаем текущее значение  с поля ввода

	getVideo(queryString);     // вызываем функция для запроса на сервер iTunes 

	$('.progress-bar').removeAttr('style');  //очищяем прогресс-бар
	animateSearch('progress-bar', 100, 700); // анимация для мнимого поиска)
});

function getVideo(query = 'hello') {
	$.ajax({
		url: `${apiUrl}/search?term=${query}&entity=movie&country=ua&limit=7`,
		method: 'GET'
	})
	.done(response => {
		allVideo = response;
		console.log("APIURL=",apiUrl, allVideo);
		var searchObj = []; searchObj = (JSON.parse(allVideo)).results;
console.log(searchObj, searchObj[0]);
		$videoList.show();

	searchObj.forEach(function(description, index) {
		console.log("description", description);
		console.log("searchObj[index]", searchObj[index]);
		var searchRes = searchObj[index];
		$('.carousel-inner').append(`<div class="item" data-id="${searchRes.trackId}">
			<p>${searchRes.artistName}</p>
			<img src="${searchRes.artworkUrl60}">
			<video src="${searchRes.previewUrl}" width="420" controls><video>
			<div>`);
		$videoList.append(`<span class="list-group-item" data-id="${searchRes.trackId}"> 
			<img src="${searchRes.artworkUrl100}"> 
			${searchRes.artistName} - ${searchRes.trackName} </br>
			</span> `);

}); 
	$('span.list-group-item').on('click', function(event){
		event.preventDefault();
 $('.carousel-inner').find('.item').removeClass().addClass('item');
	let id = $(this).attr('data-id');
		console.log('error', id, "searchRes", searchObj);
		$videoInfo.children().remove();
for (var i = 0; i < searchObj.length; i++) {
	if (searchObj[i].trackId == id) { 
		console.log($videoList, searchObj[i]);
var date = searchObj[i].releaseDate;
date = date.substr(0,10);
		$videoInfo.append(`
			<h2>${searchObj[i].trackName}</h2>
			<p>Genre: ${searchObj[i].primaryGenreName}</p>			
			<p>${searchObj[i].longDescription}</p>
			<div>
			<span>Price: ${searchObj[i].trackPrice} USD</span>
			<span>Video time: ${Math.floor( (searchObj[i].trackTimeMillis/1000)/60) } min.</span>
			<span>Release date: ${ date } </span>
			</div>

  <span class="glyphicon glyphicon-info-sign"> <a target="_blank" href="${searchObj[i].trackViewUrl}">source link</a></span>
			`);
$(`.carousel-inner [data-id="${id}"]`).addClass('active');
	}
}

	let thisItem = searchObj.filter(function(data) { return data == id});
			console.log('thisItem', thisItem);

});	
$('#tempsearch').remove();
$('.carousel-inner').find('div.item').eq(0).addClass('active');
$('#prev').trigger('click');
		
	})
	.fail(error => {
		console.log('error', error);
	});
}

$("#myCarousel").carousel({interval: 10000});

function animateSearch(id, number, time) {
$(`.${id}`).addClass('active');	  		  
$(`.${id}`).animate({ num: 0},
	700, function() {
	$('.progress-bar').removeAttr('style');
});

  $(`.${id}`).animate({ num: `${number}`}, {
    duration: time,
    step: function (num){
    $(this).attr('style', `width: ${num}%`); 
    },
    complete: function(num){
    	   $(`.${id}`).removeClass('active');

    }
});

}