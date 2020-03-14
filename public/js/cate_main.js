	var clickID = 0,index = 0,delID = 0,delIndex = 0;
	var listChecked = [],listCheckedIndex = [];
    $(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});

	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
	$('.edit').click(function()
    {
		index = $('.edit').index(this);
		var x = document.getElementById("cate-table").rows[index+1].cells;
		var a = x[1].innerHTML;
		var b = x[2].innerHTML;
		var c = x[3].innerHTML;
		var d = x[4].innerHTML;
		clickID = parseInt($(this).attr('name'));
		$('input[name="edit-name"]').val(b);
		$('input[name="edit-fullname"]').val(c);
		$('input[name="edit-des"]').val(d);
		$('input[name="catID"]').val(clickID);
    } );
	$('#edit-form').submit(function(e)
    {
   		e.preventDefault();
		var id = $('input[name="catID"]').val();
		var name = $('input[name="edit-name"]').val();
		var fullname= $('input[name="edit-fullname"]').val();
		var description = $('input[name="edit-des"]').val();
		$.ajax({
                url: "/admin/category/update",
                type: "POST",
				data: 
				{
					id : id,
					name : name,
					fullname : fullname,
					description : description
				},
				success: function(data) 
				{
					$('#editCat').modal('toggle');
					$("#success").modal("toggle");
					var x = document.getElementById("cate-table").rows[index+1].cells;
					x[2].innerHTML = name;
					x[3].innerHTML = fullname;
					x[4].innerHTML = description;
				},
				error:function ()
				{
					$("#failed").modal("toggle");
				}
            });
	} );
    $('.delete').click(function()
    {
		delIndex = $('.delete').index(this);
		delID = parseInt($(this).attr('name'));
		console.log(`Index : ${delIndex} ID : ${delID}`);
	} );
    $('#deleteAll').click(function()
    {
		var temp = [];
		var tempIndex = [];
		var x = document.getElementById("cate-table");
		// var x = document.getElementById("cate-table").rows[index+1].cells;
		checkbox.each(function(i){
				// this.checked = true;
				if (this.checked)
				{
					var ID = x.rows[i+1].cells[1].innerHTML;
					temp.push(parseInt(ID));
					tempIndex.push(parseInt(i));
				}
			});
			listChecked = temp;
			listCheckedIndex = tempIndex;
			console.log('Index : ' ,listCheckedIndex);
			console.log('ID : ',listChecked);
			
	} );
	$('#deleteAllSubmit').click(function(e)
    {
		   e.preventDefault();
		   $.ajax({
                url: "/admin/category/deleteAll",
                type: "POST",
				data: 
				{
					listID : JSON.stringify(listChecked)
				},
				success: function(data) 
				{
			        $('#deleteALL').modal('toggle');
					$("#success").modal("toggle");
					for (let index = listCheckedIndex.length -1 ; index >= 0; index--) {
						document.getElementById('cate-table').deleteRow(index + 1);					
					}
				},
				error:function ()
				{
					$("#failed").modal("toggle");
				}
            });
		
    } );
	$('#delete-form').submit(function(e)
    {
		console.log(delIndex);
		   e.preventDefault();
		   $.ajax({
                url: "/admin/category/delete",
                type: "POST",
				data: 
				{
					id : delID
				},
				success: function(data) 
				{
			        $('#deleteCat').modal('toggle');
					$("#success").modal("toggle");
					document.getElementById('cate-table').deleteRow(delIndex + 1);
				},
				error:function ()
				{
					console.log('erro');
				}
            });
		
    } );
	$('#add-form').submit(function(e)
	{
		e.preventDefault();
		var name = $('input[name="add-name"]').val();
		var fullname= $('input[name="add-fullname"]').val();
		var des = $('input[name="add-des"]').val();
		
		   $.ajax({
                url: "/admin/category/add",
                type: "POST",
				data: 
				{
					name : name,
					fullname : fullname,
					description : des
				},
				success: function(data) 
				{
			        $('#addCat').modal('toggle');
					$("#success").modal("toggle");
				},
				error:function ()
				{
					$("#failed").modal("toggle");
				}
			});
			setTimeout(function(){
					window.location.reload(1);
					}, 1500);
	});
});