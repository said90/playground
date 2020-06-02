var contracts=[
  {
    Clause: "16.4",
    No: "Sup.001",
    Subject:"Clause Subject",
    Summary:"Summary Clause",
    Type:"Obligation",
    Critically: "High",
    Owner: "Max Jones, London",
    task:[
      {
      checkFrecuency:'Annually, no later than 31 July',
      details: 'Annual CPI Report',
      provided: 'Finance Dept',
      checkingMethod: 'Calculate % difference  between  previous  year pricing and  any new pricing, compare against latest CPI figures',
      checkingMethodType:'Systematically',
      owner:"John smith"
     }
    ]
  },
  {
    Clause: "29",
    No: "Jnt.001",
    Subject:"Clause Subject",
    Summary:"Summary Clause",
    Type:"Obligation",

    Critically: "Low",
    Owner: "Ian black, New York	",
    task:[
      {
      checkFrecuency:'Quarterly',
      details: 'Quarterly software usage report',
      provided: 'IT Dept, Sydney',
      checkingMethod: 'Confirm receipt by cc of email to supplier advising quartely  license usage figures',
      checkingMethodType:'Systematically',

      owner:"John smith"
     }
    ]
  },
  {
    Clause: "8.9(b)",
    No: "Org.001",
    Subject:"Clause Subject",
    Summary:"Summary Clause",
    Type:"Obligation",

    Critically: "Medium",
    Owner: "Frank Saxon, Sydney",
    task:[
      {
        checkFrecuency:'Bi annually, in Juanary  and July',
        details: 'Curren head office address',
        provided: 'Legal  Dept, New York',
        checkingMethod: 'Standard email to suppliers advising the organization current address and requesting same from the supplier',
        checkingMethodType:'Systematically',

        owner:"John smith"
       }
    ]
  },
];
var source;
$(document).ready(function () {
  var index;
  var indexSelected;
  var table = $("#table").DataTable({
    data: contracts,
    responsive: true,
    columns: [
      { data: "Clause" },
      { data: "No" },
      { data: "Subject" },
      { data: "Summary" },
      { data: "Type" },
      { data: "Critically" },
      { data: "Owner" },
      {
        data: null,
        defaultContent:
          "<td class='actions'>      <button type='button' class='btn btn-warning btn-clause-modify' data-toggle='modal' data-target='#modalForm'><i class='fas fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger' data-toggle='modal' data-target='#modalForm'><i class='far fa-trash-alt'></i></button> </td>",
      },
    ],                
    paging: true,
    ordering: true,
  });  
  $('#add-button').on('click',function(){
    $('#confirm-button').html( "Create");
    $('#header-modal').html('Adding New Clause');
    index='';
  });

  $(document).on('click', '.modal-confirm', function (e) {
		e.preventDefault();
    $('#modalForm').modal('hide')
    
		var clauseNumber = $('#clause-number').val();
		var clause = $('#clause').val();
    var clauseSubject = $('#clause-subject').val();
    var clauseSummary = $('#clause-summary').val();
    var clauseType = $('#clause-type').val();
		var criticalLevel = $('#critical-level').val();
		var clauseOwner = $('#clause-owner').val();
		var t = $('#table').DataTable();

		var clauseData= {
	      Clause:       clause,
        No:   clauseNumber,
        Subject:    clauseSubject,
        Summary:clauseSummary,
        Type:clauseType,
        Critically: criticalLevel,
        Owner:     clauseOwner,
        task:[]
    }
  
  $('#clause-number').val('');
  $('#clause').val('');
  $('#clause-subject').val('');
  $('#clause-summary').val('');
  $('#clause-type').val('');
  $('#critical-level').val('');
  $('#clause-owner').val('');
    if (index) {
      var rows = document.getElementById("table").rows;
      rows[index].cells[0].innerHTML =clause;
      rows[index].cells[1].innerHTML=clauseNumber;
      rows[index].cells[2].innerHTML=clauseSubject;
      rows[index].cells[3].innerHTML=clauseSummary;
      rows[index].cells[4].innerHTML=clauseType;
      rows[index].cells[5].innerHTML=criticalLevel;
      rows[index].cells[6].innerHTML=clauseOwner;
    }else{
      
		t.row.add(clauseData).draw(false);

		var td = document.createElement( 'td' );
		td.innerHTML = '<i data-toggle class="far fa-plus-square text-primary h5 m-0" style="cursor: pointer;"></i>';
		td.className = "text-center";
		var $table = $('#datatable-details');
		contracts.push(clauseData);

		$('#datatable-details > tbody:last-child').append('<tr>'+'<td>'+ clauseNumber+'</td>'+ '<td>'+ clause+'</td>'+'<td>'+ clauseDetail+'</td>'+'<td>'+ criticalLevel+'</td>'+'<td>'+ clauseOwner+'</td>'+' <td class="actions"> <a ><i class="fas fa-pencil-alt"></i></a> <a  class="delete-row"><i class="far fa-trash-alt"></i></a>   </td>'+'</tr>');
		// insert the expand/collapse column




		$table
			.find( 'tbody tr' ).each(function() {
				this.insertBefore(  td.cloneNode( true ), this.childNodes[0] );
			});

	

		// add a listener
		$table.on('click', 'i[data-toggle]', function() {
			var $this = $(this),
				tr = $(this).closest( 'tr' ).get(0);

			if ( datatable.fnIsOpen(tr) ) {
				$this.removeClass( 'fa-minus-square' ).addClass( 'fa-plus-square' );
				datatable.fnClose( tr );
			} else {
				$this.removeClass( 'fa-plus-square' ).addClass( 'fa-minus-square' );
				datatable.fnOpen( tr, fnFormatDetails( datatable, tr), 'details' );
			}
		});
	
		new PNotify({
			title: 'Success!',
			text: 'Modal Confirm Message.',
			type: 'success'
    });
  }

  });
  $('#modalForm').draggable({
    handle:".card-header"
  });
  $("#table").on("click", ".btn-clause-modify", function (e) {
    var $this = $(this);
    index= this.parentNode.parentNode.rowIndex;
    var row = this.parentNode.parentNode;
    $('#header-modal').html('Modifying Clause');
    $('#confirm-button').html( "Modify");
    $("#clause-number").val(row.cells[1].innerHTML);
    $("#clause").val(row.cells[0].innerHTML);
    $("#clause-subject").val(row.cells[2].innerHTML);
    $("#clause-summary").val(row.cells[3].innerHTML);
    $("#clause-type").val(row.cells[4].innerHTML);
    $("#critical-level").val(row.cells[5].innerHTML);
    $("#clause-owner").val(row.cells[6].innerHTML);

  });

  $('#modalForm').on('hidden.bs.modal', function (e) {
    $('#clause-number').val('');
    $('#clause').val('');
    $('#clause-subject').val('');
    $('#clause-summary').val('');
    $('#clause-type').val('');
    $('#critical-level').val('');
    $('#clause-owner').val('');
  });


  var table2 = $("#table-task").DataTable({
    data: source,
    responsive: true,
    columns: [
      { data: "details" },
      { data: "checkingMethodType" },
      { data: "checkingMethod" },
      { data: "checkFrecuency" },
      { data: "provided"},
      { data: "owner" },
      {
        data: null,
        defaultContent:
          "<td class='actions'>      <button type='button' class='btn btn-warning btn-task-modify' data-toggle='modal' data-target='#modal-task'><i class='fas fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger' data-toggle='modal' data-target='#modalForm'><i class='far fa-trash-alt'></i></button> </td>",
      },
    ],           
    bDestroy: true,     
    paging: true,
    ordering: true,
  });  

  $('#modal-task').draggable({
    handle:".card-header"
  });


  $('#modal-task').on('hidden.bs.modal', function (e) {
    $('#check-frecuency').val('');
    $('#task-detail').val('');
    $('#provided-task').val('');
    $('#task-checking-method').val('');
    $('#clause-owner-task').val('');

  });

  
  $("#table tbody").on("click", "tr", function () {
    console.log(this.rowIndex);
    if ($(this).hasClass("selected")) {
      index=0;
      $(this).removeClass("selected");
      $('#btn-task').attr("disabled",true);
    
    } else {
      table.$("tr.selected").removeClass("selected");
      $(this).addClass("selected");
      index=this.rowIndex;
      $('#btn-task').attr("disabled",false);
    }
  });
 
  
  $('#confirm-button-task').on("click", function () {
    console.log($('#clause-owner-task').val());
    var task = {
      details: $('#task-detail').val(),
      checkingMethodType:$('#check-method-type').val(),
      checkingMethod: $('#task-checking-method').val(),
      checkFrecuency:$('#check-frecuency').val(),
      provided: $('#provided-task').val(),
      owner: $('#task-owner').val()
    };
    contracts[index-1].task.push(task);
    table2.clear();
    table2.rows.add(contracts[index-1].task);
    table2.draw();
      $('#check-frecuency').val('');
      $('#task-detail').val('');
      $('#provided-task').val('');
      $('#task-checking-method').val('');
      $('#clause-owner-task').val('');
      $('#modal-task').modal('hide');
  });



$('#table').on("click","tr", function(e){
    if (typeof contracts[this.rowIndex-1].task != undefined) {
      table2.clear();
      table2.rows.add(contracts[this.rowIndex-1].task);
      table2.draw();
    }else{
      table2.clear();
      table2.draw();
    }  
});  
});
