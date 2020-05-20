
$(document).ready(function () {
  var index;
  var indexSelected;
  var data = [
    {
      Clause: "16.4",
      No: "Sup.001",
      Details:
        "The annual pricing review cannot increase prices by more than then latest published inflation rate in USA1	",
      Critically: "High",
      Owner: "Max Jones, London",
    },
    {
      Clause: "29",
      No: "Jnt.001",
      Details:
        "Each aprty must promptly advise the other if their address for service of notices changes	",
      Critically: "Low",
      Owner: "Ian black, New York	",
    },
    {
      Clause: "8.9(b)",
      No: "Org.001",
      Details:
        "The organization must submit a quarterly license usage report to the supplier within 10 bussines days of the end of each busssiness quarter	",
      Critically: "Medium",
      Owner: "Frank Saxon, Sydney",
    },
  ];


  var table = $("#table").DataTable({
    data: data,
    responsive: true,
    columns: [
      { data: "Clause" },
      { data: "No" },
      { data: "Details" },
      { data: "Critically" },
      { data: "Owner" },
      {
        data: null,
        defaultContent:
          "<td class='actions'>      <button type='button' class='btn btn-warning' data-toggle='modal' data-target='#modalForm'><i class='fas fa-pencil-alt'></i></button> </a> <a class='delete-row'><i class='far fa-trash-alt'></i></a></td>",
      },
    ],                
    paging: true,
    ordering: true,
  });  
    $(document).on('click', '.modal-confirm', function (e) {
		e.preventDefault();
    $('#modalForm').modal('hide')
    
		var clauseNumber = $('#clause-number').val();
		var clause = $('#clause').val();
		var clauseDetail = $('#clause-detail').val();
		var criticalLevel = $('#critical-level').val();
		var clauseOwner = $('#clause-owner').val();
		var t = $('#table').DataTable();

		var clauseData= {
	     "Clause":       clause,
        "No":   clauseNumber,
        "Details":    clauseDetail,
        "Critically": criticalLevel,
        "Owner":     clauseOwner
    }
  
  $('#clause-number').val('');
  $('#clause').val('');
  $('#clause-detail').val('');
  $('#critical-level').val('');
  $('#clause-owner').val('');
    if (index) {
      var rows = document.getElementById("table").rows;
      rows[index].cells[0].innerHTML =clauseNumber;
      rows[index].cells[1].innerHTML=clause;
      rows[index].cells[2].innerHTML=clauseDetail;
      rows[index].cells[3].innerHTML=criticalLevel;
      rows[index].cells[4].innerHTML=clauseOwner;


    }else{
      
		t.row.add(clauseData).draw(false);

		var td = document.createElement( 'td' );
		td.innerHTML = '<i data-toggle class="far fa-plus-square text-primary h5 m-0" style="cursor: pointer;"></i>';
		td.className = "text-center";
		var $table = $('#datatable-details');
		data.push(clauseData);

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

$('#modal-task').draggable({
  handle:".card-header"
});

$('#add-button').on('click',function(){
  $('#confirm-button').html( "Create");
  $('.card-title').html('Adding New Clause');
  index='';
});

  $("#table").on("click", ".btn-warning", function (e) {
    var $this = $(this);
    index= this.parentNode.parentNode.rowIndex;
    var row = this.parentNode.parentNode;
    $('.card-title').html('Modifying Clause');
    $('#confirm-button').html( "Modify");
    $("#clause-number").val(row.cells[0].innerHTML);
    $("#clause").val(row.cells[1].innerHTML);
    $("#clause-detail").val(row.cells[2].innerHTML);
    $("#critical-level").val(row.cells[3].innerHTML);
    $("#clause-owner").val(row.cells[4].innerHTML);
  });

  

  $('#modalForm').on('hidden.bs.modal', function (e) {
    $("#clause-number").val('');
    $("#clause").val('');
    $("#clause-detail").val('');
    $("#critical-level").val('');
    $("#clause-owner").val('');
  })

  $("#table tbody").on("click", "tr", function () {
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      table.$("tr.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });
    
$('#table').on("click","tr", function(e){
    console.log(this.rowIndex);
    var task1= 
    [
      {
        checkFrecuency:'Annually, no later than 31 July',
      details: 'Annual CPI Report',
      provided: 'Finance Dept',
      checkingMethod: 'Calculate % difference  between  previous  year pricing and  any new pricing, compare against latest CPI figures'
     }
    ];

    var task2= 
    [
      {
        checkFrecuency:'Quarterly',
      details: 'Quarterly software usage report',
      provided: 'IT Dept, Sydney',
      checkingMethod: 'Confirm receipt by cc of email to supplier advising quartely  license usage figures'
     }
    ];

    var task3= 
    [
      {
      checkFrecuency:'Bi annually, in Juanary  and July',
      details: 'Curren head office address',
      provided: 'Legal  Dept, New York',
      checkingMethod: 'Standard email to suppliers advising the organization current address and requesting same from the supplier'
     }
    ];

    var table2 = $("#table-task").DataTable({
      data: source,
      responsive: true,
      columns: [
        { data: "checkFrecuency" },
        { data: "details" },
        { data: "provided"},
        { data: "checkingMethod" },
        
      ],           
      bDestroy: true,     
      paging: true,
      ordering: true,
    });  
    var source;
    if (this.rowIndex == 1) {
        table2.clear();
        table2.rows.add(task1);
       table2.draw();
    };
    if (this.rowIndex == 2) {

      table2.clear();
        table2.rows.add(task2);
       table2.draw();
    };

    if (this.rowIndex == 3) {
      table2.clear();
      table2.rows.add(task3);
      table2.draw();

    };
    

}); 
  
});
