print(JSON.stringify(db.getUsers()));


print('');
print('Question1: How many unique users are there?');
var unique_users = db.mydata.distinct("id_member").length;
print('Answer:'+unique_users);


print('');
print('Question2: How many tweets(%) did the top 10 users measured by the number of messages) publish?');
var temp1 = db.mydata.aggregate([{$group:{_id:"$id_member",twets:{$sum:1}}},{$sort:{twets:-1}},{$limit:10}]);
print('Answer:'+ JSON.stringify(temp1));


print('');
print('Question3:What was the earliest and lastet data (YYYY-MM-DD HH:MM:SS) that a message was published?');
var early = db.mydata.find({},{"timestamp":1,"_id":0}).limit(1).sort({timestamp:1});
e = early[0];
print( 'Answer:Earliest date:'+ e['timestamp']);

var late = db.mydata.find({},{"timestamp":1,"_id":0}).sort({timestamp: -1}).limit(1);
l = late[0];
print('Latest date: '+ l['timestamp']);
	


print('');
print('Question4: What is the mean time delta between all message?');
var smallest = db.mydata.find({},{"timestamp":1,"_id":0}).limit(1).sort({timestamp:1});
m = smallest[0];

var longest = db.mydata.find({},{"timestamp":1,"_id":0}).sort({timestamp: -1}).limit(1);
l = longest[0];

function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
}

var shorttime = m.timestamp;
var unix = datetime_to_unix(shorttime);

var longtime = l.timestamp;
var unix2 = datetime_to_unix(longtime);

var delta=unix2-unix;
var sum= db.mydata.find().count();
print('Answer:'+ delta/sum);



print('');
print('Question5: What is the mean length of a message');
var length = 0;
var message_quantity = db.mydata.find().count();
var text = db.mydata.find({},{"text":1 , "_id":0})
for ( var x=0;x<message_quantity;x++){
length+= text[x].text.toString().length;
}
print('Answer:' + length/message_quantity);


print('');
print('Question6: What are the 10 most common unigram and bigram strings within the  message?');



print('');
print('Question7: What is the average number of hashtags(#)used within a message?');
var number = db.mydata.find({"text":/#/}).count();
var sum = db.mydata.find({"text":{$ne:null}}).count();
print('Answer:' + number/sum)



print('');
print('Question8: Which are within the UK contains the largest number of published  message?');