(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    assessmentButton.onclick = ()=>{
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
        //console.log(userName);
        removeAllChild(resultDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        removeAllChild(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
                        + encodeURIComponent('あなたのいいところ')
                        + '&ref_src=twsrc%5Etfw'; 
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }
    userNameInput.onclick = (event) =>{
        if (event.key === 'Enter'){
            assessmentButton.onclick();
        }
    }
    const answers = [
        '{userName}のいいところはスピードです。',
        '{userName}のいいところはシュート精度です。',
        '{userName}のいいところは高さです。',
        '{userName}のいいところは守備です。',
        '{userName}のいいところはクロス精度です。',
        '{userName}のいいところは展開力です。',
        '{userName}のいいところはセットプレーのキック精度です。',
        '{userName}のいいところはキャプテンシーです。',
        '{userName}のいいところは闘争心です。',
        '{userName}のいいところは特にないです。'
    ];

    function assessment(userName){
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++){
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    function removeAllChild(element){
        while(element.firstChild){//子供の要素がある限り削除
         element.removeChild(element.firstChild);
         }
     }

    //console.log(assessment('太郎'));
    //console.log(assessment('三郎'));
    //console.log(assessment('太郎'));
    //console.assert(assessment('太郎') === '次郎のいいところはセットプレーのキック精度です。', 'だめです');
})();
