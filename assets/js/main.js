'use strict';

$(document).ready(function() {


/******************************************/
/************** SUPPORT MENU  *************/
/******************************************/


    var supportMenu    = $('.support-menu');
    var supportTrigger = $('.support-menu span');
    var plus           = $('.support-menu .fa-plus');
    var supportInput   = $('.support-input');
    var closeSupport   = $('.support-input .close');
    var contactButton  = $('.contact-button');

    if ($('body').hasClass('page')) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 550) {
                supportMenu.fadeIn('slow');
            } else {
                supportMenu.fadeOut('fast');
            }
        });
    }

    supportMenu.hover(function(){
        plus.transition({ rotate: '90deg' },300,'ease');
        supportMenu.transition({ x: 0},300,'ease');
        },function(){
        plus.transition({ rotate: '0deg' },400,'ease');
        supportMenu.transition({ x: '63%'},400,'ease');
    });

    supportTrigger.add(contactButton).click(function(event){
        supportInput.transition({ x: 0},250,'ease');
        supportMenu.transition({ x: 0},250,'ease');
        event.preventDefault();
    });

    closeSupport.click(function(event) {
        supportInput.transition({ x: '100%'},250,'ease');
        event.preventDefault();
    });

    var $contactForm = $('#supportForm');
    var $sendButton = $('#sendMessage')

    $sendButton.click(function(){
        $sendButton.val('Senden ...');
        $('#response').empty();

        $.ajax({
            type:     'POST',
            url:      'https://formspree.io/l.knoke@colorplus.de',
            data:     $contactForm.serialize(),
            dataType: 'json',
            // encode:   true,
            beforeSend: function() {
              $sendButton.prop('disabled', true);
              $contactForm.append('<div class="alert alert--loading">Senden...</div>');
            },
            success: function(data) {
              $contactForm.find('.alert--loading').hide();
              $contactForm.trigger('reset');
              $sendButton.removeProp('disabled');
              $sendButton.val('Senden');
              $contactForm.append('<div class="alert alert--success">Nachricht gesendet!</div>');
            },
            error: function(err) {
              $contactForm.find('.alert--loading').hide();
              $contactForm.append('<div class="alert alert--error">Ein Fehler ist aufgetreten. Bitte versuchen Sie es noch einmal!</div>');
            }
        })

          // .done(function(data){
          //   if (data.success) {
          //       $('#response').html(data.message).removeClass().addClass('success');
          //       $('#supportForm').trigger('reset');
          //       $('#sendMessage').val('Senden');
          //
          //   }
          //   else {
          //       $('#response').html(data.message).removeClass().addClass('fail');
          //       $('#sendMessage').val('Senden');
          //   }
          // })
          //
          // .fail(function(data) {
          //     console.log('Fail');
          //     $('#response').html('Ein Fehler ist aufgetreten. Bitte versuchen Sie es noch einmal!');
          // });

        event.preventDefault();

    });

/******************************************/
/**************** MUSTER  *****************/
/******************************************/


    $('#send').click(function(){
        $(this).val('Senden ...');
        $('#response').empty();

        $.ajax({
            type:     'POST',
            url:      'muster.php',
            data:     $('#contact-form').serialize(),
            dataType: 'json',
            encode:   true
        })

          .done(function(data){
            if (data.success) {
                $('#response').html(data.message).removeClass().addClass('success');
                $('#contact-form').trigger('reset');
                $('#send').val('Senden');

            }
            else {
                $('#response').html(data.message).removeClass().addClass('fail');
                $('#send').val('Senden');
            }
          })

          .fail(function(data) {
              console.log('Fail');
              $('#response').html('Ein Fehler ist aufgetreten. Bitte versuchen Sie es noch einmal!');
          });

        event.preventDefault();

    });

/******************************************/
/**************** LOGIN  ******************/
/******************************************/


    // process the form
    $('#loginForm').submit(function(event) {

        // $('.form-group').removeClass('has-error'); // remove the error class
        // $('.help-block').remove(); // remove the error text

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'user_name'     : $('input[name=user_name]').val(),
            'user_password' : $('input[name=user_password]').val(),
        };

        // process the form
        $.ajax({
            type:     'POST',
            url:      'login/login.php',
            data:     formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode:   true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data);

                // here we will handle errors and validation messages
                if ( ! data.success) {
                    console.log('Login not successfull!');

                    // handle errors for name ---------------
                    if (data.errors) {
                        console.log(data.errors);
                        $('.remodal').addClass('has-error'); // add the error class to show red input
                        $('.errors').empty();
                        $('.errors').append('<div class="help-block">' + data.errors + '</div>'); // add the actual error message under our input
                    }

                } else {
                    $('#loginForm').hide();
                    $('.errors').empty();
                    // $('div[data-remodal-id="upload-modal"]').load('login/views/dropzoneForm.php');
                    window.location = '/index.php#upload-modal'; // redirect a user to another page
                }
            })

            // using the fail promise callback
            .fail(function(data) {

                // show any errors
                // best to remove for production
                console.log(data);
                console.log('Fail');
            });

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

    /******************************************/
    /* TEAM CONTACT BLOCK */
    /******************************************/

    $('.contact-trigger').click(function(){
        $(this).parents().siblings('.contact-block').slideToggle();
        return false;
    });

    $('.member-container div.column.three:nth-child(4n)').addClass('last');



    /******************************************/
    /* DROPZONE */
    /******************************************/

    /*global Dropzone:true,myDropzone:true*/

    // var previewNode = document.querySelector('#template');
    // previewNode.id = '';
    // var previewTemplate = previewNode.parentNode.innerHTML;
    // previewNode.parentNode.removeChild(previewNode);
    //
    // Dropzone.autoDiscover = false;
    //
    // $('div#my-dropzone').dropzone({
    //
    //       // Prevents Dropzone from uploading dropped files immediately
    //       autoProcessQueue: false,
    //       url: '/upload/upload.php',
    //       dictDefaultMessage: 'Daten hier ablegen...',
    //       parallelUploads: 100,
    //       maxFiles: 100,
    //       // uploadMultiple: true,
    //       // paramName: [],
    //       createImageThumbnails: false,
    //       previewsContainer: '#previews',
    //       previewTemplate: previewTemplate,
    //
    //         init: function() {
    //             var submitButton = document.querySelector('#submit-all');
    //             var cancelButton = document.querySelector('#remove-all');
    //             var closeButton = document.querySelector('#close-button');
    //             var customerForm = document.querySelector('#customerForm');
    //             var loader = document.querySelector('#loader');
    //
    //             var myDropzone = this; // closure
    //
    //             submitButton.addEventListener('click', function() {
    //               myDropzone.processQueue(); // Tell Dropzone to process all queued files.
    //             });
    //
    //             cancelButton.addEventListener('click', function() {
    //               myDropzone.removeAllFiles();
    //               submitButton.style.display = 'none';
    //               cancelButton.style.display = 'none';
    //               customerForm.style.display = 'none';
    //             });
    //
    //             closeButton.addEventListener('click', function(remodal){
    //               myDropzone.removeAllFiles();
    //               $('[data-remodal-id=upload-modal]').remodal().close();
    //               closeButton.style.display = 'none';
    //             });
    //
    //             // You might want to show the submit button only when
    //             // files are dropped here:
    //             this.on('addedfile', function(file) {
    //               submitButton.style.display = 'inline-block';
    //               cancelButton.style.display = 'inline-block';
    //               // customerForm.style.display = 'block';
    //               document.getElementById('my-dropzone').classList.add('dz-started');
    //             });
    //
    //             this.on('sending', function(){
    //               submitButton.style.display = 'none';
    //               cancelButton.style.display = 'none';
    //               loader.style.display = 'inline-block';
    //             });
    //
    //             // this.on('successmultiple', function(file, remodal){
    //             this.on('queuecomplete', function(file, remodal){
    //               loader.style.display = 'none';
    //               closeButton.style.display = 'inline-block';
    //               console.log('Uploaded!');
    //             });
    //         }
    // });



}); /* close document-ready */
