<?php
class SpaController extends AppController
{
    var $name = "Spa";
    var $component = array('Auth');
    var $uses = array();
    function beforeFilter()
    {
        $this->Auth->allow('index');
        parent::beforeFilter();
    }
    function index()
    {
        //
    }
}
