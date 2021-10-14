let body = document.body;
let url = window.location.toString();

let getNameFromUrl = function(url){
	let divUrl = url.split('=');
	let name = divUrl[1];
	if (name == undefined){
		name = 'korzhowVD'
	}
return name;
}

fetch('https://api.github.com/users/' + getNameFromUrl(url))
	.then(res => res.json())
	.then(json => {
		userPhoto = json.avatar_url;
		userName = json.name;
		userBio = json.bio;
		userLink = json.html_url;
		
		let photo = new Image();   // Создаёт новый элемент изображения
		photo.src = userPhoto; // Устанавливает путь
		body.append(photo);

        let name = document.createElement('h1');
        if (userName != null) {
            name.innerHTML = `<a href='${userLink}' target=blank>${userName}</a>`;;
        } else {
            name.innerHTML = 'Имя пользователя недоступно';
        }
        body.append(name);
        name.addEventListener("click", () => location.assign(`https://github.com/${getNameFromUrl(url)}`));

        let bio = document.createElement('p');
        if (userBio != null) {
            bio.innerHTML = userBio;
        } else {
            bio.innerHTML = 'Описание профиля пользователя недоступно';
        }
        body.append(bio);
	})

.catch (err => err.innerHTML('Информация о пользователе недоступна'))


