export class CreateDocumentDto {
  filename: string;
  filePath: string;
  ownerid?: string;
  lastmodifybyid?: string;
  createtime?: Date;
  lastmodifytime?: Date;
  is_deleted?: boolean;
}
