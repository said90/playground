/*
Name: 			Tables / Advanced - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version: 	2.2.0
*/

(function($) {

	'use strict';

	var datatableInit = function() {
		var $table = $('#datatable-details');

		// format function for row details
		var fnFormatDetails = function( datatable, tr ) {
			var data = datatable.fnGetData( tr );

			return [
				'<table class="table mb-0">',
					'<tr class="b-top-0">',
						'<td><label class="mb-0">Check Frecuency:</label></td>',
						'<td>' + 'Annually, no later then 31 July'+'</td>',
					'</tr>',
					'<tr>',
						'<td><label class="mb-0">Details:</label></td>',
						'<td>Annual CPI Report</td>',
					'</tr>',
					'<tr>',
						'<td><label class="mb-0">Provided By:</label></td>',
						'<td>Finance Dept, London</td>',
					'</tr>',
					'<tr>',
					'<td><label class="mb-0">Cheking Method:</label></td>',
					'<td>Calculate % difference between previous year pricing and any new pricing, compare against latest CPI figures</td>',
					'<tr>',
						'<td><label class="mb-0">Init Date:</label></td>',
						'<td>01/01/2020</td>',
					'</tr>',
					'<tr>',
					'<td><label class="mb-0">Finish Date:</label></td>',
					'<td>07/31/2020</td>',
					'</tr>',
					
				'</tr>',
				'</table>'
			].join('');
		};

		// insert the expand/collapse column
		var th = document.createElement( 'th' );
		var td = document.createElement( 'td' );
		td.innerHTML = '<i data-toggle class="far fa-plus-square text-primary h5 m-0" style="cursor: pointer;"></i>';
		td.className = "text-center";

		$table
			.find( 'thead tr' ).each(function() {
				this.insertBefore( th, this.childNodes[0] );
			});

		$table
			.find( 'tbody tr' ).each(function() {
				this.insertBefore(  td.cloneNode( true ), this.childNodes[0] );
			});

		// initialize
		var datatable = $table.dataTable({
			dom: '<"row"<"col-lg-6"l><"col-lg-6"f>><"table-responsive"t>p',
			aoColumnDefs: [{
				bSortable: false,
				aTargets: [ 0 ]
			}],
			aaSorting: [
				[1, 'asc']
			]
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
	};

	$(function() {
		datatableInit();
	});

}).apply(this, [jQuery]);