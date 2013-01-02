<?php

abstract class MetaBox
{

    private $metaKey;
    private $title;

    public function __construct($metaKey, $title)
    {
        $this->metaKey = $metaKey;
        $this->title = $title;

        add_action('add_meta_boxes', array(&$this, 'addMetaBox'));
        add_action('save_post', array(&$this, 'saveMetaBox'));

        $this->enqueue();
    }

    public function addMetaBox()
    {
        add_meta_box(
            $this->getMetaKey(),
            $this->getTitle(),
            array(&$this, 'displayMetaBox'),
            'post',
            'normal',
            'high'
            );
    }

    public function displayMetaBox($post)
    {
        global $post;

        wp_nonce_field(
            get_template_directory_uri(),
            'football-stats-nonce'
            );

        $data = get_post_meta($post->ID, $this->getMetaKey(), true);

        require FOOTBALL_STATS_PLUGIN_PATH . $this->getTemplatePath();
    }

    public function saveMetaBox($postID)
    {
        $nonce = 'football-stats-nonce';

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) 
        {
            return;
        }

        if (isset($_POST['football-stats-nonce']))
        {
            if (!wp_verify_nonce($_POST['football-stats-nonce'], get_template_directory_uri()))
            {
                return;
            }
        }
        
        $currentData = get_post_meta($postID, $this->getMetaKey(), true);
        $data;
        if (isset($_POST[$this->getMetaKey()]))
        {
            $data = $_POST[$this->getMetaKey()];
        }
        
        if ($currentData)
        {
            if (empty($data))
            {
                delete_post_meta($postID, $this->getMetaKey());
            }
            else
            {
                update_post_meta($postID, $this->getMetaKey(), $data);
            }
        }
        elseif ((!$currentData) && (!empty($data)))
        {
            add_post_meta($postID, $this->getMetaKey(), $data, true);
        }
    }

    protected function getMetaKey()
    {
        return $this->metaKey;
    }

    public function getTitle()
    {
        return $this->title;
    }

    abstract protected function getTemplatePath();

    abstract protected function enqueue();
}