/*
~~~ Higher Order Function: ~~~ | meant to be used with arrays
forEach
filter
map
sort
reduce
*/

const messages = [
    {id: Math.random(5), text:"algum texto a", date:"today"},
    {id: Math.random(5), text:"algum texto ab", date:"today"},
    {id: Math.random(5), text:"algum texto abc", date:"today"},
    {id: Math.random(5), text:"algum texto abcd", date:"today"},
    {id: Math.random(5), text:"algum texto abcde", date:"today"},
    {id: Math.random(5), text:"algum texto abcdef", date:"yesterday"},
    {id: Math.random(5), text:"algum texto abcdefg", date:"yesterday"},
    {id: Math.random(5), text:"algum texto abcdefgh", date:"yesterday"},    
]

//=============== forEach ===============
//= = = = possibilita criar ~coisas~ `para cada` elemento/objeto de um array, por exemplo: `para cada` "id" no array "messages", criar uma exibição desse "id" = = = =

//comparável ao forEach:
for(let i=0; i < messages.length; i++) {
    //variável de contagem; regras de contagem; incremento
    //i; enquanto i < 8; aumente o "i" com +1
    console.log("Teste 0,", messages[i])
}

//forEach:
messages.forEach(function(messages) {
    console.log("Primeira seq. no `console` (forEach),", messages.id)
})




//=============== filter ===============
//= = = = cria um novo array `filtrando` um primeiro sob determinada condição = = = =

//teste sem um `filtro` propriamente, só com push:
let messagesTexts = []
for (let i=0; i < messages.length; i++) {
    messagesTexts.push(messages[i].text)
}
console.log("Teste 1, ", messagesTexts)

//comparável ao filter:
let messagesWithLongTxt = []
for(let i=0; i < messages.length; i++) {
    if(messages[i].text.length >= 17) {
        messagesWithLongTxt.push(messages[i].text)
    }
}
//console:
console.log("2ª seq. no `console`,", messagesWithLongTxt)
    //criou o array vazio | para cada "i" menor que 8 (`i` de iteração, 8 é o número de lin), se o "text" de cada tupla do array tiver o tamanho menor que 10 (como num `filter`), fazer com que o array "messagesText" `empurre` as "i" tuplas do array "messages" (no caso, somente o "text" de cada tupla)

//filter - maneira 1 | função callback "inline":
const messagesWithLongText = messages.filter(function (longtext) {
    return longtext.text.length > 17
})
//console:
console.log("3ª seq. no `console` (filter - maneira I),", messagesWithLongText)

//filter - maneira 2 | função callback separada:
function longText(longtext) { 
    //~argumento~ serve de `invólucro`
    return longtext.date === "today"
}
const msgsWithLongTxt = messages.filter(longText)
//console:
console.log("4ª seq. no `console` (filter - maneira II),", msgsWithLongTxt)

//filter - maneira 3 | só funciona com arrays de elementos:
//const canDrink = ages.filter(age => age >= 21)
//console:
//console.log("6ª seq. no `console` (filter - maneira III), não feito")

//filter - maneira 4 | igual a maneira 1, com a função callback "inline", mas com arrow function:
const longTextYesterday = messages.filter(longYestd => (longYestd.text.length >= 11 && longYestd.date === "yesterday"))
//console:
console.log("7ª seq. no `console`", longTextYesterday)

//teste sem iteração nem filtro, só "push" - um `clone`:
let STM = []
STM.push(messages)
//console:
console.log("Teste 2, ", STM)




//=============== map ===============
//= = = = forma novo array `mapeando` (e possivelmente manipulando) um a um todos os elementos/objetos de um determinado array = = = =

//map - maneira 1 | (...):
const messagesIds = messages.map(function(slot) {
    return slot.id
})
//console:
console.log("8ª seq. no `console`", messagesIds)

//teste substituindo cada elemento:
const novoMap = messages.map(function(slot) {
    return 1
})
//console:
console.log("Teste 3, ", novoMap)

//map - maneira 2 | template string:
const messagesToday = messages.map(function(socket) {
    return `Feita ${socket.date}, com o texto ${socket.text}`
})
    // ${...} template string permite `stringificar` conteúdos que não são `strings` e/ou concatena-los com strings
//console:
console.log("9ª seq. no `console`", messagesToday)

//map - maneira 2.1 | template string + arrow function:
const messagesTodayS = messages.map(socket =>
    `Feita ${socket.date}, com o texto ${socket.text}`)
//console:
console.log("10ª seq. no `console`", messagesTodayS)

//map - maneira 3 | operações com o map:
const idMais1 = messages.map(socket => socket.id + 1)
//cada elemento recebera uma soma "+1"
//console:
console.log("11ª seq. no `console`", idMais1)

//map - maneira 4 | operações com o map + map:
const idMais2 = messages.map(socket => socket.id + 1).map(slot => Math.round(slot))
//console:
console.log("12ª seq. no `console`", idMais2)




//=============== sort ===============
//= = = = `sortiza` os objetos/elementos de um array especificado em um novo array, de acordo com os critérios passados (combinados aos argumentos) = = = =

//sort - maneira 1 | function extensa:
const sortedMessages0 = idMais2.sort(function(c1, c2) {
     if(c1.id > c2.id) {
         return 1
     } else {
         return -1
     }
 })
//console:
console.log("13ª seq. no `console`", sortedMessages0)

//sort - maneira 2 | arrow function:
const sortedMessages = messages.sort((a, b) => (a.id > b.id ? 1 : -1))
//"a" e "b" significam os `sockets` para comparar os valores dos "id" do array "message" | "1" e "-1" significam ordenar de forma crescente ou descrescente respectivamente
//console:
console.log("14ª seq. no `console`", sortedMessages)

//sort - maneira 2 | arrow function:
sortedIds = idMais1.sort((a, b) => a-b)
//"a-b" ou "b-a" significam ordenar os valores 
//console:
console.log("15ª seq. no `console`", sortedIds)




//=============== reduce ===============
//= = = = `sortiza` os objetos/elementos de um array especificado em um novo array, de acordo com os critérios passados (combinados aos argumentos) = = = =

//comparável ao reduce:
let idSum = 0
 for (let i=0; i < messages.length; i++) {
    idSum += messages[i].text.length
}
//console:
console.log("16ª seq. no `console`", idSum)

//sort - maneira 1 | chegando a um resultado com arrow function:
const totalId = messages.reduce((sloti, slot) => sloti + slot.id, 0)
//sintaxe que soma os "id" de cada 
//console:
console.log("17ª seq. no `console`", totalId)

//sort - maneira 2 | xxx arrow function:
const totalCharacters = messages.reduce((total, slot) => total + (slot.text.length))
//console:
console.log("18ª seq. no `console`", totalCharacters)


