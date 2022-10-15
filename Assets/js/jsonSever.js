// var courseApi = 'http://localhost:3000/courses';
// fetch(courseApi)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(courses) {
//         return console.log(courses);
//     })

var appApi = 'http://localhost:3000/courses';

function start() {
    getApp(rederApp);
    // getApp(function(courses) {
    //     console.log(courses);
    // })
}

start();

// function
function getApp(callback) {
    fetch(appApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function rederApp(courses) {
    var song = document.querySelector('.renderSong');
    var htmls = courses.map(function(courses){
        return `
        
        <div class="col l-2-4 m-3 c-4">
        <div class=" item--playlist">
            <div class="row__item-container flex--top-left">
                <div class="row__item-display br-5">
                <div class="row__item-img" style="background: url('${courses.image}') no-repeat center center / cover"></div>
                    <div class="row__item-actions action-hover-rgba">
                        <div class="action-btn">
                            <i class="btn-icon purple-primary fas fa-heart"></i>
                        </div>
                        <div class="btn--play-playlist action-btn-boder">
                            <i class=" btn-icon-l fas fa-play"></i>
                        </div>
                        <div class="action-btn">
                        <i class="btn-icon fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                </div>
                <div class="row__item-info">
                    <a href="#" class="info-name mt-10"> ${courses.name}</a>
                    <samp class="info-creator mt-5">${courses.singer}</samp>
                </div>
            </div>
        </div>
    </div>
        `;
    });
    song.innerHTML = htmls.join('');
}