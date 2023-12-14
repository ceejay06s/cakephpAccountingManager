<?php
class AppController extends Controller
{
    var $name = "App";

    var $components = array(
        'Auth' => array(
            'authorize' => 'actions',
            'actionPath' => 'controllers/',
            'logoutRedirect' => array(
                'controller' => 'spa',
                'action' => 'index'
            )
        ),
        'Session',
    );

    function beforeFilter()
    {
        $this->Auth->fields = array('username' => 'email', 'password' => 'password');
        parent::beforeFilter();
    }

    function beforeRender()
    {
        $vitefiles =  json_decode(file_get_contents(WWW_ROOT . 'dist/.vite/manifest.json'), true);
        $contents = [];
        foreach ($vitefiles["main.jsx"] as $type => $viteFile) {

            if (is_array($viteFile)) {

                foreach ($viteFile as $modules => $types) {
                    if ($type == 'imports') {
                        $types = $vitefiles[$types]['file'];
                    }
                    $ext = explode('.', $types)[1];
                    $contents[$ext][] = $types;
                }
            } elseif (is_file(WWW_ROOT . 'dist/' . $viteFile)) {
                $ext = explode('.', $viteFile)[1];
                if (in_array($ext, array('js', 'jsx', 'ts', 'tsx')))
                    $contents['js'][] = $viteFile;
                else
                    $contents[$ext][] = $viteFile;
            }
        }
        $vitefiles = $contents;
        $this->log($vitefiles, 'log');
        $this->set(compact('vitefiles'));
        parent::beforeRender();
    }
}
