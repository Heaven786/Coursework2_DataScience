print(JSON.stringify(db.getUsers()));

var listDatabases = db.adminCommand('listDatabases');
print(JSON.stringify(listDatabases));

var seperate_line = '----------------------------------';

print('');
print(seperate_line);
print('Query1: How many unique user are there?');
var total_user = db.userdata.distinct("id_member").length;
print('Total user:'+total_user);



// print('');
// print(seperate_line);
// print('Query2: How many tweets(%) did the top 10 users measured by the number of messages) publish?');
// var total_tweets = db.tweets.find().count();
// var top_10 = db.tweets.aggregate([{$group:{_id:"$id_member",num_tweets:{$sum:1}}},{$sort:{num_tweets:-1}},{$limit:10}])
// if(top_10.length()){
//    var top10_tweets = 0, i = 0;
//    t = top_10[i];
//    while (i<10)
//    {
//    	top10_tweets = top10_tweets + t['num_tweets'];
//    	i++;
//    }

//    var percent = Math.round(top10_tweets/total_tweets*10000)/100.00 +"%";
//    print('The top 10 users published: ' + percent );

// }



print('');
print(seperate_line);
print('Query3:What was the earliest and lastet data (YYYY-MM-DD HH:MM:SS) that a message was published?');
var earliest_date = db.userdata.find({},{"timestamp":1,"_id":0}).sort({timestamp: 1}).limit(1);

if (earliest_date.length()) {
	d = earliest_date[0];
	print( 'Earliest date: '+ d['timestamp']);
}

var latest_date = db.userdata.find({},{"timestamp":1,"_id":0}).sort({timestamp: -1}).limit(1);
if (latest_date.length()){
   d = latest_date[0];
   print('Latest_date: '+ d['timestamp']);

}



// print('');
// print(seperate_line);
// print('Query4: What is the mean time delta between all message?');
// var sorttime = db.tweets.find({},{"timestamp":1,"_id":0}).sort({timestamp: 1});
// if (sorttime.length()){
// 	var i = 0;
// 	stf = sorttime[i];
// 	stl = sorttime[i-1]
// 	while(i<total_tweets)
// 	{
// 		var mean = 0; 
// 		mean = + stl['timestamp'] - stf['timestamp'];
// 		i++;
// 	}
// 	 delta_mean = mean/(total_tweets-1);
// 	 print('delta mean: ' + delta_mean);

// }



// print('');
print(seperate_line);
print('Query5: What is the mean length of a message');
var s = 0;
var total_tweets = db.userdata.find().count();
db.userdata.find({},{"text":1 , "_id":0}).forEach(function(myDoc){
	s += myDoc.text.length;
})
print(s/total_tweets);
     //var eachlength = myDoc.text.length;
//      var x =0;
//      var sumlength = 0;
//      while (x < total_tweets )
//      {
//      	sumlength = + eachlength[i];
//      	x++;
//      }
//      return(sumlength);
//      	)
// var mean_length = sumlength/total_tweets;
// print(mean_length);



print('');
print(seperate_line);
print('Query6: What are the 10 most common unigram and bigram strings within the  message?');



print('');
print(seperate_line);
print('Query7: What is the average number of hashtags(#)used within a message?');



print('');
print(seperate_line);
print('Query8: Which are within the UK contains the largest number of published  message?');