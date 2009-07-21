<?php
/**
 * Mail class for PHProjekt 6.0
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @author     Mariano La Penna <mariano.lapenna@mayflower.de>
 * @package    PHProjekt
 * @subpackage Core
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

/**
 * Mail class for PHProjekt 6.0
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: @package_version@
 * @license    LGPL 2.1 (See LICENSE file)
 * @package    PHProjekt
 * @subpackage Core
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Mariano La Penna <mariano.lapenna@mayflower.de>
 */
class Phprojekt_Mail extends Zend_Mail
{
    const MODE_HTML          = 'Html';
    const MODE_TEXT          = 'Text';
    //External use (configuration.ini):
    const LINEEND_RN         = 0;
    const LINEEND_N          = 1;
    const TRANSPORT_SMTP     = 0;
    const TRANSPORT_SENDMAIL = 1;

    /**
     * Sets the SMTP server. The data is obtained from the configuration.ini file.
     *
     * @return Zend_Mail_Transport_Smtp or Zend_Mail_Transport_Sendmail object
     */
    public function setTransport()
    {
        switch (Phprojekt::getInstance()->getConfig()->mailTransport) {
            case self::TRANSPORT_SMTP:
            default:
                $smtpServer   = Phprojekt::getInstance()->getConfig()->smtpServer;
                $smtpAuth     = Phprojekt::getInstance()->getConfig()->smtpAuth;
                $smtpUser     = Phprojekt::getInstance()->getConfig()->smtpUser;
                $smtpPassword = Phprojekt::getInstance()->getConfig()->smtpPassword;
                $smtpSsl      = Phprojekt::getInstance()->getConfig()->smtpSsl;
                $smtpPort     = Phprojekt::getInstance()->getConfig()->smtpPort;

                if (empty($smtpServer)) {
                    $smtpServer = 'localhost';
                }

                $parameters = array();
                if (!empty($smtpAuth)) {
                    $parameters['auth'] = $smtpAuth;
                }
                if (!empty($smtpUser)) {
                    $parameters['username'] = $smtpUser;
                }
                if (!empty($smtpPassword)) {
                    $parameters['password'] = $smtpPassword;
                }
                if (!empty($smtpSsl)) {
                    $parameters['ssl'] = $smtpSsl;
                }
                if (!empty($smtpPort)) {
                    $parameters['port'] = $smtpPort;
                }

                if (empty($parameters)) {
                    $smtpTransport = new Zend_Mail_Transport_Smtp($smtpServer);
                } else {
                    $smtpTransport = new Zend_Mail_Transport_Smtp($smtpServer, $parameters);
                }

                break;

            case self::TRANSPORT_SENDMAIL:
                $smtpTransport = new Zend_Mail_Transport_Sendmail();
                break;
        }

        return $smtpTransport;
    }

    /**
     * Returns the string used for end of line in text mode emails, according to config file setting
     *
     * @return string End of line characters
     */
    protected function getEndOfLine()
    {
        switch (Phprojekt::getInstance()->getConfig()->mailEndOfLine) {
            case self::LINEEND_N:
                $endOfLine = "\n";
                break;
            case self::LINEEND_RN:
            default:
                $endOfLine = "\r\n";
                break;
        }

        return $endOfLine;
    }
}
