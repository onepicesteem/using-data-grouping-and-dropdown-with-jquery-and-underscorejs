$(function(){//$(document).ready()
   
    $('#ulGender').append('<li><a href="#">All</a></li>');
    $('#ulTask').append('<li><a href="#">All</a></li>');

    $.getJSON('./staff.json',function(data){
        //console.log(data);
        var selectedGender='All';
        var selectedTask='All';

        var genderList=_.groupBy(data,function(value){
            return value.gender;
        })
        //console.log(genderList);
        var genders=_.keys(genderList);
        //console.log(genders);

        _.each(genders,function(value){
            
            $('#ulGender').append('<li><a href="#">'+value+'</a></li>');
        })

        var taskList=_.groupBy(data,function(value){
            return value.task;
        })

        var tasks=_.keys(taskList);

        _.each(tasks,function(value,index){
            $('#ulTask').append('<li><a href="#">'+value+'</a></li>');
        })

        $('#ulGender>li>a').click(function(){

            selectedGender=$(this).text();
            $('#btnGender').text(selectedGender);
            
        })

        $('#ulTask>li>a').click(function(){

            selectedTask=$(this).text();
            $('#btnTask').text(selectedTask);
            
        })
       
        $('#btnSubmit').click(function(){

            $('#pnl').empty();

            var whereList;
            if(selectedGender=='All'&&selectedTask=='All'){
                whereList=data;
            }else{
                if(selectedGender=='All'){
                    whereList=_.where(data,{task:selectedTask});
                }else{
                    if(selectedTask=='All'){
                        whereList=_.where(data,{gender:selectedGender});
                    }else{
                        whereList=_.where(data,{gender:selectedGender,task:selectedTask});
                    }
                }
            }
            

            _.each(whereList,function(value){
                
                $('#pnl').append('<div class="panel panel-default"><div class="panel-heading"><div class="row"><div class="col-md-6"><b>name: </b>'+value.name+'</div><div class="col-md-6"><b>age: </b>'+value.age+'</div></div></div><div class="panel-body"><div class="row"><div class="col-md-6"><b>gender: </b>'+value.gender+' </div><div class="col-md-6"><b>task: </b>'+value.task+'</div> </div> </div> </div> ');

            })
        })
        

    })

    



})