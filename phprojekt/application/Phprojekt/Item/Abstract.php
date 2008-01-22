<?php
/**
 * An item, with database manager support
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id$
 * @link       http://www.phprojekt.com
 * @author     Gustavao Solt <solt@mayflower.de>
 * @since      File available since Release 1.0
 */

/**
 * An item, with database manager support
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     Gustavao Solt <solt@mayflower.de>
 */
abstract class Phprojekt_Item_Abstract extends Phprojekt_ActiveRecord_Abstract implements Phprojekt_Model_Interface
{
    /**
     * Represents the database_manager class
     *
     * @var Phprojekt_ActiveRecord_Abstract
     */
    protected $_dbManager = null;

    /**
     * Error object
     *
     * @var Phprojekt_Error
     */
    protected $_error = null;

    /**
     * History object
     *
     * @var Phprojekt_Histoy
     */
    protected $_history = null;

    /**
     * Config for inicializes children objects
     *
     * @var array
     */
    protected $_config = null;

    /**
     * Full text Search object
     *
     * @var Phprojekt_SearchWords
     */
    protected $_search = null;

    /**
     * History data of the fields
     *
     * @var array
     */
    public $history = array();

    /**
     * Initialize new object
     *
     * @param array $db Configuration for Zend_Db_Table
     */
    public function __construct($db = null)
    {
        parent::__construct($db);

        $this->_dbManager = new Phprojekt_DatabaseManager($this, $db);
        $this->_error     = new Phprojekt_Error();
        $this->_history   = new Phprojekt_History($db);
        $this->_search    = new Phprojekt_SearchWords($db);
        $this->_config    = Zend_Registry::get('config');
    }

    /**
     * Returns the database manager instance used by this phprojekt item
     *
     * @return Phprojekt_DatabaseManager
     */
    public function getInformation()
    {
        return $this->_dbManager;
    }

    /**
     * Enter description here...
     *
     * @return Phprojekt_DatabaseManager_Field
     */
    public function current()
    {
        return new Phprojekt_DatabaseManager_Field($this->getInformation(),
                                                   $this->key(),
                                                   parent::current());
    }

    /**
     * Assign a value to a var using some validations from the table data
     *
     * @param string $varname Name of the var to assign
     * @param mixed  $value   Value for assign to the var
     *
     * @return void
     */
    public function __set($varname, $value)
    {
        $info = $this->info();

        if (isset($info['metadata'][$varname])) {

            $type = $info['metadata'][$varname]['DATA_TYPE'];

            switch ($type) {
                case 'int':
                    $value = Inspector::sanitize('integer', $value, $messages);
                    break;
                case 'float':
                    if (!empty($value)) {
                        $value = Inspector::sanitize('float', $value, $messages);
                        $value = Zend_Locale_Format::getFloat($value, array('precision' => 2));
                    } else {
                        $value = 0;
                    }
                    break;
                case 'date':
                    $value = Inspector::sanitize('date', $value, $messages);
                    break;
                case 'time':
                    $value = Inspector::sanitize('time', $value, $messages);
                    break;
                case 'timestamp':
                    $value = Inspector::sanitize('timestamp', $value, $messages);
                    break;
                default:
                    $value = Inspector::sanitize('string', $value, $messages);
                    break;
            }
        } else {
            $value = Inspector::sanitize('string', $value, $messages);
        }
        parent::__set($varname, $value);
    }

    /**
     * Return if the values are valid or not
     *
     * @return boolean
     */
    public function recordValidate()
    {
        $validated = true;
        $data      = $this->_data;
        $fields    = $this->_dbManager->getFieldDefinition(MODELINFO_ORD_FORM);

        foreach ($data as $varname => $value) {
            if (isset($this->$varname)) {
                /* Validate with the database_manager stuff */
                foreach ($fields as $field) {
                    if ($field['key'] == $varname) {
                        $validations = $field;

                        if (true === $validations['required']) {
                            $error = $this->validateIsRequired($value);
                            if (null != $error) {
                                $validated = false;
                                $this->_error->addError(array(
                                    'field'   => $varname,
                                    'message' => $error));
                                break;
                            }
                        }

                        $error = $this->validateValue($varname, $value);
                        if (null != $error) {
                            $validated = false;
                             $this->_error->addError(array(
                                'field'   => $varname,
                                'message' => $error));
                        }
                        break;
                    }
                }

                /* Validate an special fieldName */
                $validater  = 'validate' . ucfirst($varname);
                if ($validater != 'validateIsRequired') {
                    if (in_array($validater, get_class_methods($this))) {
                        $error = call_user_method($validater, $this, $value);
                        if (null != $error) {
                            $validated = false;
                            $this->_error->addError(array(
                                'field'   => $varname,
                                'message' => $error));
                        }
                    }
                }
            }
        }
        return $validated;
    }

    /**
<<<<<<< Abstract.php
     * Validate a value use the database type of the field
     *
     * @param string $varname Name of the field
     * @param mix    $value   Value to validate
     *
     * @return string Error message or null if is valid
     */
    public function validateValue($varname, $value)
    {
        $info  = $this->info();
        $valid = true;
        if (isset($info['metadata'][$varname])) {

            $type = $info['metadata'][$varname]['DATA_TYPE'];

            switch ($type) {
                case 'int':
                    $valid = Inspector::validate('integer', $value, $messages, true);
                    break;
                case 'float':
                    $valid = Inspector::validate('float', $value, $messages, true);
                    break;
                case 'date':
                    $valid = Inspector::validate('date', $value, $messages, true);
                    break;
                case 'time':
                    $valid = Inspector::validate('time', $value, $messages, true);
                    break;
                case 'timestamp':
                    $valid = Inspector::validate('timestamp', $value, $messages, true);
                    break;
                default:
                    $valid = Inspector::validate('string', $value, $messages, true);
                    break;
            }
        }

        if (!$valid) {
            return 'Invalid format';
        } else {
            return null;
        }
    }

    /**
     * Validate required fields
     * return the msg error if exists
     *
     * @param mix $value The value to check
     *
     * @return string Error string or null
     */
    public function validateIsRequired($value)
    {
        $error = null;
        if (empty($value)) {
            $error = 'Is a required field';
        }
        return $error;
    }

    /**
     * Get a value of a var.
     * Is the var is a float, return the locale float
     *
     * @param string $varname Name of the var to assign
     *
     * @return mixed
     */
    public function __get($varname)
    {
        $info = $this->info();

        $value = parent::__get($varname);

        if (true == isset($info['metadata'][$varname])) {
            $type = $info['metadata'][$varname]['DATA_TYPE'];
            if ($type == 'float') {
                $value = Zend_Locale_Format::toFloat($value, array('precision' => 2));
            }
        }

        if (null != $value && is_string($value)) {
            $value = stripslashes($value);
        }

        return $value;
    }

    /**
     * Return the error data
     *
     * @return array
     */
    public function getError()
    {
        return (array) $this->_error->getError();
    }

    /**
     * Extencion of the Abstarct Record for save the history
     *
     * @return void
     */
    public function save()
    {
        $result = true;
        if ($this->id > 0) {
            $this->_history->saveFields($this, 'edit');
            $result = parent::save();
        } else {
            $result = parent::save();
            $this->_history->saveFields($this, 'add');
        }

        $this->_search->indexObjectItem($this);

        return $result;
    }

    /**
     * Extencion of the Abstarct Record for save the history
     *
     * @return void
     */
    public function delete()
    {
        $this->_history->saveFields($this, 'delete');
        $this->_search->deleteObjectItem($this);
        parent::delete();
    }

    /**
     * Return wich submodules use this module
     *
     * @return array
     */
    public function getSubModules()
    {
        return array();
    }

    /**
     * Return the fields that can be filtered
     *
     * This function must be here for be overwrited by the default module
     *
     * @return array
     */
    public function getFieldsForFilter()
    {
        return $this->getInformation()->getInfo(MODELINFO_ORD_LIST, Phprojekt_DatabaseManager::COLUMN_NAME);
    }


    /**
     * Rewrites parent fetchAll, so that only records with read access are shown
     *
     * @param string|array $where  Where clause
     * @param string|array $order  Order by
     * @param string|array $count  Limit query
     * @param string|array $offset Query offset
     *
     * @return Zend_Db_Table_Rowset
     */
    public function fetchAll($where = null, $order = null, $count = null, $offset = null)
    {
        //only fetch records with read access
        $wheres      = array();
        $groupwhere  = array();
        $groupwheres ='';
        $groups      = Phprojekt_Loader::getModel('Groups', 'Groups');
        $usergroups  = $groups->getUserGroups();

        foreach ($usergroups as $groupId) {
            $groupwhere[] = $this ->getAdapter()->quoteInto('?', $groupId);
        }

        $in = (count($groupwhere) > 0) ? implode(',', $groupwhere) : null;

        $groupwheres = '('.$this ->getAdapter()->quoteInto('ownerId = ?', $groups->getUserId()).
        $groupwheres.= ($in) ? ' OR `read` IN ('.$in.')  OR `write` IN ('.$in.')  OR `admin` IN ('.$in.'))' :')';

        $wheres[] = $groupwheres;

        if (null !== $where) {
            $wheres[] = $where;
        }

        $where = (is_array($wheres) && count($wheres) > 0) ?
                    implode(' AND ', $wheres) : null;

        return parent::fetchAll($where, $order, $count, $offset);
    }

    /**
     * Returns the right the user has on a Phprojekt item
     *
     * @todo Make sure that this doesnot need any database query
     *
     * @return string $right
     */
    public function getRights()
    {
        $right     = '';
        $itemright = '';
        $class = $this->getTableName();
        if ($this->_data['id']>0) {
            $groups = Phprojekt_Loader::getModel('Groups', 'Groups');
            if ($this->read) {
                if ($groups->isUserInGroup($this->_data['read'])) {
                    $itemright = 'read';
                }
            }
            if ($this->write) {
                if ($groups->isUserInGroup($this->_data['write'])) {
                    $itemright = 'write';
                }
            }
            if ($this->admin) {
                if ($groups->isUserInGroup($this->_data['admin'])) {
                    $itemright = 'admin';
                }
            }
            if ($this->ownerId == $groups->getUserId()) {
                $itemright = 'admin';
            }
            switch ($class) {
                case'Project':
                    $relfield=$this->_data['parent'];
                    break;
                default:
                    $relfield=$this->_data['projectId'];
                    break;
            }

        } else {
            $itemright='write';
            $session        = new Zend_Session_Namespace();
            $relfield       = (int) $session->currentProjectId;
        }
        $rolerights     = new Phprojekt_RoleRights($relfield, $class, $this->_data['id']);
        $rolerightread  = $rolerights->hasRight('read');
        $rolerightwrite = $rolerights->hasRight('write');
        switch ($itemright) {
            case'read':
                if ($rolerightread || $rolerightwrite) {
                    $right = 'read';
                }
                break;
            case'write':
                if ($rolerightread ) {
                    $right = 'read';
                }
                if ($rolerightwrite) {
                    $right ='write';
                }
                break;
            case'admin':
                if ($rolerightread ) {
                    $right = 'read';
                }
                if ($rolerightwrite) {
                    $right = 'admin';
                }
                break;
            default:
                break;
        }
        return $right;
    }
}
