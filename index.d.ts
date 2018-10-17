// Type definitions for scap API library
// Project: http://webossignage.developer.lge.com/api/scap-api/scap-library/

interface FilesList { filesList: Object; filesCount: number; }

interface ExternalMemory {
    [deviceURI: string] : GetStorageInfoResult;
}

interface GetStorageInfoResult {
    free: number; //Free space (KB) in the local storage.
    total: number; //Total space (KB) of the local storage.
    used: number;//Used space (KB) in the local storage.
    externalMemory?: ExternalMemory;
}

interface CopyFileOptions {
    /**
     * The URI of the file to be copied.
     *
     * @type {string}
     * @memberof CopyFileOptions
     */
    source: string;

    /**
     * The URI of the target location to copy the source file to. 
     * If the given target location does not exist, this method automatically creates the given path.
     *
     * @type {string}
     * @memberof CopyFileOptions
     */
    destination: string;
    
    ftpOption?: {
        secure?: 'implicit' | 'explicit';
        secureOptions?: {
            privateKey?: string;
            passphrase?: string;
        },
        connTimeout?: number;
        pasvTimeout?: number;
        keepalive?: number;
    };
    httpOption?: {
        maxRedirection?: number;
        headers?: {
            [name: string]: any
        },
        /**
         * 	The time out period after which the underlying TCP connection gets disconnected. To keep the connection on without time out, set the value to 0, which is the default value.
         *  N.B. If the server side has a set timeout that is shorter than the value set for this property, copying a file may timeout before the time set for this property is passed.
         *
         * @type {number}
         */
        timeout?: number;
    }
}

interface Storage {
        changeLogoImage(successCallback : any ,failureCallback : any, options : Object) : void;	

        /**
         * Copies a file from the given source location to the given target location.
         * Available source locations are; remote server, USB flash drive, SD card and local storage. Specify the file or directory as a URI
         *
         * @param {*} successCallback
         * @param {*} failureCallback
         * @param {Object} options
         * @memberof Storage
         */
        copyFile(successCallback : any ,failureCallback : any, options : CopyFileOptions) : void;
        downloadFirmware(successCallback : any ,failureCallback : any, options : Object) : void;
        
        
        /**
         * Checks if the given file or directory does exist in the local storage or an external storage.
         * Give the pathname as a URI.
         * 
         * @param {*} successCallback
         * @param {*} failureCallback
         * @param {{ path: string }} options
         * @memberof Storage
         */
        exists(successCallback : (result: { exists: boolean }) => void ,failureCallback : (error) => void, options : { path: string }) : void;
        fsync(successCallback : any ,failureCallback : any, options : Object);
        listFiles(successCallback : any ,failureCallback : any, options : Object) : FilesList;
        
        /**
         * Creates a directory. The directory pathname shall be given as a URI.
         * If the given pathname does not exist, sub-directories will be created recursively.
         * 
         * @param {*} successCallback
         * @param {*} failureCallback
         * @param {{ path: string }} options
         * @memberof Storage
         */
        mkdir(successCallback : () => void ,failureCallback : any, options : { path: string }) : void;
        moveFile(successCallback : any ,failureCallback : any, options : Object) : void;
        readFile(successCallback : any ,failureCallback : any, options : Object) : string;
        removeFile(successCallback : any ,failureCallback : any, options : Object) : void;
        removeAll(successCallback : any ,failureCallback : any, options : Object) : void;
        upgradeApplication(successCallback : any ,failureCallback : any, options : Object) : void;
        getStorageInfo(successCallback : (result: GetStorageInfoResult) => void ,failureCallback : any) : void;
        statFile(successCallback : any ,failureCallback : any, options : Object) : void; // Gets status information of a file.
        writeFile(successCallback : any, failureCallback : any, options : Object) : void;
}

declare var Storage: {
    new()       :   Storage;
    prototype   :   Storage;
}