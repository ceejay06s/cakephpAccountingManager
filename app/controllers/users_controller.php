<?php
class UsersController extends AppController
{

	var $name = 'Users';
	var $components = array('Auth', 'Cookie', 'Session');
	function beforeFilter()
	{
		$this->Auth->allow('register', 'checkauth');
		parent::beforeFilter();
	}

	function login()
	{

		if ($this->Auth->user()) {
			if (!empty($this->data['User']['remember_me'])) {
				$cookie = array();
				$cookie['email'] = $this->data['User']['email'];
				$cookie['password'] = $this->data['User']['password'];
				$this->Cookie->write('Auth.User', $cookie, true, '+2 weeks');
				unset($this->data['User']['remember_me']);
			}
			$this->redirect($this->Auth->redirect());
		}
		if (empty($this->data)) {
			$cookie = $this->Cookie->read('Auth.User');
			if (!is_null($cookie)) {
				if ($this->Auth->login($cookie)) {
					//  Clear auth message, just in case we use it.
					$this->Session->delete('Message.auth');
					$this->redirect($this->Auth->redirect());
				}
			}
			$this->redirect('/#/login');
		}

		//var_dump($this->data);
		$this->layout = false;
		$this->render(false);
	}
	function register()
	{
		var_dump($this->data);
		$this->layout = false;
		$this->render(false);

		if (!empty($this->data)) {
			$this->User->create();
			$this->data['User']['updated_at'] = $this->data['User']['created_at'] =  date('Y-m-d H:i:s', strtotime('now'));
			if ($this->User->save($this->data)) {
				// send signup email containing password to the user
				$this->Auth->login($this->data);
				$this->redirect('/#');
			}
		}
	}
	function checkAuth()
	{
		echo json_encode($this->Auth->user());
		$this->layout = false;
		$this->render(false);
	}

	function logout()
	{
		$this->redirect($this->Auth->logout());
		$this->layout = false;
		$this->render(false);
	}
}
