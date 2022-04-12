export interface IMailProvider {
    sendMail(
        to: string, 
        subject: string, 
        body: string,
        variables: any,
        path: string
    ): Promise<void>;
}