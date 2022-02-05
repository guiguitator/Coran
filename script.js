const maelle = '❤';

const core = document.getElementById('core');
const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/fra-islamicfoundati-la.json';

var coran;

function init() {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'json';
	request.onload = function() {
		var status = request.status;
		if (status === 200) {
			console.log(request.response.quran);
			coran = request.response.quran;
			chapter = 1;
			for (var i = 0; i < coran.length; i++) {
				if (coran[i].chapter == chapter) {
					document.getElementById(`chapter-${chapter}`).insertAdjacentHTML('beforeend', `<p><span>${coran[i].verse}. </span>${coran[i].text}</p>`);
				} else {
					chapter++;
					core.insertAdjacentHTML('beforeend', `<div id="chapter-${chapter}"><p><span>${coran[i].verse}. </span>${coran[i].text}</p></div>`);
				}
			}
			changeChapter();
		} else {
			console.log("Error with the API.");
		}
	};
	request.send();
}

var current_chapter = 1;

function changeChapter(value) {
	if (current_chapter < 1) {
		current_chapter = 1;
	}
	if (current_chapter > 114) {
		current_chapter = 114;
	}
	if (Number.isInteger(current_chapter) == false) {
		current_chapter = 1;
	}
	for (var i = 0; i < core.children.length; i++) {
		core.children[i].classList.remove('visible');
	}
	document.getElementById(`chapter-${current_chapter}`).classList.add('visible');
	document.getElementById('chapter_input').value=current_chapter;
}

init();