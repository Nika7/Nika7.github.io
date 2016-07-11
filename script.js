//����� �������� ���-��������
$(function() {
  //��� ������� �� ������ ��������
  $("#reload-captcha").click(function() {
	//������� ����� ��� �����
    $('#img-captcha').attr('src','captcha.php?id='+Math.random()+'');
  });  
  //��� �������� ����� messageForm �� ������ (id="save")
  $('#messageForm').submit(function(event) {
    //�������� ����������� �������� ��������
    event.preventDefault();
    //������� ����������, ������� ����� �������� � ��� �������� ����� ��� ���
    var formValid = true;
    //���������� ��� �������� ���������� ����� (input � textarea) 
    $('#messageForm input,textarea').each(function() {
      //���� ���� ������� �����, �� ���������� ��� ��������
      if ($(this).attr('id') == 'text-captcha') { return true; }
      //����� �������, ������� ����� .form-group (��� ������������ success/error)
      var formGroup = $(this).parents('.form-group');
      //����� glyphicon (������ ������ ��� ������)
      var glyphicon = formGroup.find('.form-control-feedback');
      //��������� ������ � ������� HTML5 ������� checkValidity
      if (this.checkValidity()) {
        //�������� � formGroup ����� .has-success � ������� .has-error
        formGroup.addClass('has-success').removeClass('has-error');
        //�������� � glyphicon ����� .glyphicon-ok � ������� .glyphicon-remove
        glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
      } else {
        //�������� � formGroup ����� .has-error � ������� .has-success
     	formGroup.addClass('has-error').removeClass('has-success');
	    //�������� � glyphicon ����� glyphicon-remove � ������� glyphicon-ok
	    glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
	    //���� ������� �� ������ ��������, �� �������� ����� ��� �� �������� 
	    formValid = false;  
      }
    });
    //��������� �������, ���������� ��� �����
    //1. �������� �������� �������� input, ����������� ��� �����
    var captcha = $("#text-captcha").val();
    //2. ���� ����� ���� �����, ������� ��� ������������ �� ����� 6,
	//   �� ����� �������� ����� ��� ���������� (��� �������� �� ������)
    if (captcha.length!=6) {
	  // �������� �������, ���������� �����
      inputCaptcha = $("#text-captcha");
	  //����� ������, �������� ����� .form-group (��� ������������ success/error)
      formGroupCaptcha = inputCaptcha.parents('.form-group');
	  //����� glyphicon (������ ������ ��� ������)
      glyphiconCaptcha = formGroupCaptcha.find('.form-control-feedback');
	  //�������� � formGroup ����� .has-error � ������� .has-success
      formGroupCaptcha.addClass('has-error').removeClass('has-success');
	  //�������� � glyphicon ����� glyphicon-remove � ������� glyphicon-ok
      glyphiconCaptcha.addClass('glyphicon-remove').removeClass('glyphicon-ok');
    }
    // ����� ������� � ����� ����� ����� 6 ��������, �� ���������� ����� �� ������ (AJAX)
    if (formValid && captcha.length==6) {
	  //�������� ���, ������� ��� ������������	
	  var name = $("#name").val();
	  //�������� email, ������� ��� ������������
      var email = $("#email").val();
	  //�������� ���������, ������� ��� ������������
      var message = $("#message").val();
	  //�������� �����, ������� ��� ������������
      var captcha = $("#text-captcha").val();
	  //���������� ������ �� ������ (AJAX)
      $.ajax({
		//����� �������� ������� - POST
        type: "POST",
		//URL-����� ������� 
        url: "feedback/verify.php",
		//������������ ������
        data: "name=" + name + "&email=" + email + "&message=" + message + "&captcha=" + captcha,
		//��� �������� ���������� �������
        success : function(text){
		  //���� ������� ����� success, �� ������ ������ ����������
          if (text == "success"){
			//������ ����� �������� �����
            $('#messageForm').hide();
			//������� � �������, �������� id msgSubmit, ����� hidden
            $('#msgSubmit').removeClass('hidden');
          }
		  //���� ������ ����� invalidcaptcha, �� ������ ���������...
	      if (text == "invalidcaptcha") {
			//�������� �������, ���������� �����
		    inputCaptcha = $("#text-captcha");
			//����� ������, �������� ����� .form-group (��� ������������ success/error)
            formGroupCaptcha = inputCaptcha.parents('.form-group');
			//����� glyphicon (������ ������ ��� ������)
            glyphiconCaptcha = formGroupCaptcha.find('.form-control-feedback');
			//�������� � formGroup ����� .has-error � ������� .has-success
            formGroupCaptcha.addClass('has-error').removeClass('has-success');
			//�������� � glyphicon ����� glyphicon-remove � ������� glyphicon-ok
            glyphiconCaptcha.addClass('glyphicon-remove').removeClass('glyphicon-ok');
			//������� ����� ��� �����
			$('#img-captcha').attr('src', 'feedback/captcha.php?id='+Math.random()+'');
			//���������� ���� ����� ����� ������ ��������
			$("#text-captcha").val('');
	      }
        }
      });
	}	 
  });
});
