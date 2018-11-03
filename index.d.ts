// Type definitions for scap API library
// Project: http://webossignage.developer.lge.com/api/scap-api/scap-library/

interface FilesList { filesList: Object; filesCount: number; }

interface ExternalMemory {
    [deviceURI: string]: GetStorageInfoResult;
}

interface GetStorageInfoResult {
    free: number; //Free space (KB) in the local storage.
    total: number; //Total space (KB) of the local storage.
    used: number;//Used space (KB) in the local storage.
    externalMemory?: ExternalMemory;
}

interface StatFileResult {
    type: "file" | "directory" | "unknown";
    size: number; //byte
    /**
     * 	The last time the file was accessed.
     *
     * @type {string}
     * @memberof StatFileResult
     */
    atime: string;

    /**
     * The last time when the file content was modified (File modification time).
     * Actions such as owner change or permission change does not trigger a change for this property.
     * Thus this property is used for tracking the actual changes in the file content.
     *
     * @type {string}
     * @memberof StatFileResult
     */
    mtime: string;

    /**
     * 	The last time when a file attribute (e.g. ownership, permission) was modified (File change time).
     *
     * @type {string}
     * @memberof StatFileResult
     */
    ctime: string;
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

interface PathOptions {
    /**
     * The URI of the file
     *
     * @type {string}
     * @memberof PathOptions
     */
    path: string;
}

interface WriteFileOptions {
    path: string;
    data: string | ArrayBuffer;
    mode?: "truncate" | "append" | "position";
    position?: number;
    length?: number;
    encoding?: Encoding;
}

declare type Encoding = "utf8" | // Encode as UTF-8. The data to write shall be a string. (Default)
    "base64" | //Encode as base64. The data to write shall be a string.
    "binary"; //Encode as raw binary. The data to write shall be an ArrayBuffer.

interface ReadFileOptions {
    path: string;
    position?: number;
    length?: number;
    encoding?: Encoding;
}

interface ReadFileResult {
    data: string | ArrayBuffer;
}

interface RemoveFileOptions {
    file: string;
    /**
     * Delete the directory and any content inside the directory.
     * Default is false
     *
     * @type {boolean}
     * @memberof RemoveFileOptions
     */
    recursive?: boolean;
}

interface WebosFile {
    name?: string;
    type?: string;
    size?: number;
}

interface ListFilesResult {
    files: WebosFile;
    /**
     * Number of the files in the given location.
     *
     * @type {number}
     * @memberof ListFilesResult
     */
    totalCount: number;
}

interface Storage {
    changeLogoImage(successCallback: any, failureCallback: any, options: Object): void;

    /**
     * Copies a file from the given source location to the given target location.
     * Available source locations are; remote server, USB flash drive, SD card and local storage. Specify the file or directory as a URI
     *
     * @param {*} successCallback
     * @param {*} failureCallback
     * @param {Object} options
     * @memberof Storage
     */
    copyFile(successCallback: any, failureCallback: any, options: CopyFileOptions): void;
    downloadFirmware(successCallback: any, failureCallback: any, options: Object): void;


    /**
     * Checks if the given file or directory does exist in the local storage or an external storage.
     * Give the pathname as a URI.
     * 
     * @param {*} successCallback
     * @param {*} failureCallback
     * @param {{ path: string }} options
     * @memberof Storage
     */
    exists(successCallback: (result: { exists: boolean }) => void, failureCallback: (error) => void, options: PathOptions): void;
    fsync(successCallback: any, failureCallback: any, options: Object);
    //Lists the files in the given directory stored in the local storage or in an external storage. The directory pathname shall be given as a URI.s
    listFiles(successCallback: any, failureCallback: any, options: { path?: string }): FilesList;

    /**
     * Creates a directory. The directory pathname shall be given as a URI.
     * If the given pathname does not exist, sub-directories will be created recursively.
     * 
     * @param {*} successCallback
     * @param {*} failureCallback
     * @param {{ path: string }} options
     * @memberof Storage
     */
    mkdir(successCallback: () => void, failureCallback: any, options: PathOptions): void;
    moveFile(successCallback: any, failureCallback: any, options: Object): void;

    /**
     * Reads the given file from the local storage or an external storage. The pathname shall be given in a URI
     *
     * @param {(result : ReadFileResult) => void} successCallback
     * @param {*} failureCallback
     * @param {ReadFileOptions} options
     * @returns {string}
     * @memberof Storage
     */
    readFile(successCallback: (result: ReadFileResult) => void, failureCallback: any, options: ReadFileOptions): string;

    /**
     * Removes a file in the local storage or an external storage. Give the file pathname as a URI
     *
     * @param {() => void} successCallback
     * @param {*} failureCallback
     * @param {RemoveFileOptions} options
     * @memberof Storage
     */
    removeFile(successCallback: () => void, failureCallback: any, options: RemoveFileOptions): void;
    removeAll(successCallback: any, failureCallback: any, options: Object): void;
    upgradeApplication(successCallback: any, failureCallback: any, options: Object): void;
    getStorageInfo(successCallback: (result: GetStorageInfoResult) => void, failureCallback: any): void;

    /**
     * Gets status information of a file.
     *
     * @param {(result: StatFileResult) => void} successCallback
     * @param {*} failureCallback
     * @param {PathOptions} options
     * @memberof Storage
     */
    statFile(successCallback: (result: StatFileResult) => void, failureCallback: any, options: PathOptions): void;


    writeFile(successCallback: any, failureCallback: any, options: Object): void;
}

declare var Storage: {
    new(): Storage;
    prototype: Storage;
}

interface WebOSError {
    errorCode: number;
    errorText: string;
}

interface ChangeInputSourceOptions {
    src: string;
}

interface InitializeInputSourceOptions extends ChangeInputSourceOptions {
    divId: string;
    videoId: string;
    callback: () => void;
}

interface GetInputSourceStatusResult {
    inputSourceList: { "inputPort": string }[];
    currentInputSource: "ext://hdmi:1" | "ext://hdmi:2" | "ext://dvi:1" | "ext://dp:1" | string;
    currentSignalState: "good" | "bad" | "unknown";
}

interface  InputSource {

    /**
     * Changes the current input source displayed on the screen.
     * @memberof InputSource
     */
    changeInputSource(successCallback: () => void, failureCallback: any, options: ChangeInputSourceOptions);


    /**
     * Returns a list of external input sources connected to a signage device
     *
     * @memberof InputSource
     */
    getExternalInputList();


    /**
     * Gets the current input source, its status, and a list of available input sources.
     *
     * @memberof InputSource
     */
    getInputSourceStatus(successCallback: (result: GetInputSourceStatusResult) => void, failureCallback: any);

    /**
     * Creates a video tag with the given ID inside the given div tag.
     * @memberof InputSource
     */
    initialize(successCallback: () => void, failureCallback: any, options: InitializeInputSourceOptions);
}

declare var InputSource: {
    new(): InputSource;
    prototype: InputSource;
}