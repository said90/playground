/*
Name: 			UI Elements / Modals - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version: 	2.2.0
*/

(function($) {

	'use strict';

	/*
	Basic
	*/
	$('.modal-basic').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});

	/*
	Sizes
	*/
	$('.modal-sizes').magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});

	/*
	Modal with CSS animation
	*/
	$('.modal-with-zoom-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		modal: true
	});

	$('.modal-with-move-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom',
		modal: true
	});

	/*
	Modal Dismiss
	*/
	$(document).on('click', '.modal-dismiss', function (e) {
		e.preventDefault();

		$.magnificPopup.close();
	});

	/*
	Modal Confirm
	*/
	$(document).on('click', '.modal-confirm', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
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
	});

	/*
	Form
	*/
	$('.modal-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		modal: true,

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	/*
	Ajax
	*/
	$('.simple-ajax-modal').magnificPopup({
		type: 'ajax',
		modal: true
	});

}).apply(this, [jQuery]);