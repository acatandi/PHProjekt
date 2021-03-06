<?php
/**
 * Project Extension
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 3 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * @category   PHProjekt
 * @package    Application
 * @subpackage Project
 * @copyright  Copyright (c) 2010 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL v3 (See LICENSE file)
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.1
 * @version    Release: @package_version@
 * @author     Reno Reckling <reno.reckling@mayflower.de>
 */

/**
 * Project Extension
 *
 * This makes Project_Migration available to the Phprojekt library through the
 * extension api.
 *
 * @category   PHProjekt
 * @package    Application
 * @subpackage Project
 * @copyright  Copyright (c) 2011 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL v3 (See LICENSE file)
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.1.0
 * @version    Release: @package_version@
 * @author     Reno Reckling <reno.reckling@mayflower.de>
 */

class Project_Extension extends Phprojekt_Extension_Abstract
{
    public function getVersion()
    {
        return '6.1.0';
    }

    public function getMigration()
    {
        return new Project_Migration();
    }
}
