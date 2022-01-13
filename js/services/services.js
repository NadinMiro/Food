//переменная отвечает за постинг данных
const postData = async (url, data) => { 
    const res = await fetch (url, {
        method: "POST",
        headers: {
                    'Content-type': 'application/json'
                },
                body: data 
    });
    
    return await res.json();// тут возвращается промис
    };

    const getResource = async (url) => { 
        const res = await fetch (url);
    
        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`); //выкидывание ошибки 
        }
        
        return await res.json();// тут возвращается промис
    }; 
    
    
    export {postData};
    export {getResource};