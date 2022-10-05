import { Account } from '././account';
import { SettingsTrackingCategories } from '././settingsTrackingCategories';
export declare class Settings {
    /**
    * Payroll Account details for SuperExpense, SuperLiabilty, WagesExpense, PAYGLiability & WagesPayable.
    */
    'accounts'?: Array<Account>;
    'trackingCategories'?: SettingsTrackingCategories;
    /**
    * Number of days in the Payroll year
    */
    'daysInPayrollYear'?: number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
