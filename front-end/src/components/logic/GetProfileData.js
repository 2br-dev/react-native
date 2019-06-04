import $ from 'jquery';

function getProfileData()
{
    let result = false;
    $.ajax({
        // получение данных
        type: "POST",
        url: "/back-end/api/UserProfile.php",
        data: "accessToken="+localStorage.getItem('accessToken'),
        async: false,
        success: function (response) {
            console.log('Запрос на получение данных в GetProfileData');
            if (response === 'guest') {
                console.log('Невалидный токен'); // только для dev версии, убрать перед билдом
                return;
            }
            if (response === '') console.log('Пустой ответ сервера');
            console.log('response = ', response);
            const parser = new DOMParser();
            const xml = parser.parseFromString(response, "text/xml");
            console.log('xml = ', xml);
            const xmlCollection = xml.childNodes[0].childNodes; // первый тег user, он содержит в себе все нужные теги
            console.log('xmlCollection', xmlCollection);
            const arrayFromXML = {};
            for (let i = 0; i < xmlCollection.length; i++) {
                arrayFromXML[xmlCollection[i].tagName] = xmlCollection[i].innerHTML;
            }
            arrayFromXML.length = xmlCollection.length; // у сформированного массива arrayFromXML length == 0, поэтому присваивается length от xmlCollection
            console.log('arrayFromXML', arrayFromXML);
            result = arrayFromXML;
        },
        error: function (xhr, status) {
            console.log('Неудалось установить соединение с сервером. Проверьте интернет соединение и обновите страницу.');
            console.log('Статус: '+status);
        },
    });

    return result;
}

export { getProfileData };
