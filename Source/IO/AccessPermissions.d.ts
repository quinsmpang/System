export declare enum AccessPermissions {
    ExecuteByOthers = 1,
    WriteByOthers = 2,
    ReadByOthers = 4,
    AllByOthers = 7,
    ExecuteByGroup = 8,
    WriteByGroup = 16,
    ReadByGroup = 32,
    AllByGroup = 56,
    ExecuteByOwner = 64,
    WriteByOwner = 128,
    ReadByOwner = 256,
    AllByOwner = 448,
    Default = 438,
    All = 511,
}
