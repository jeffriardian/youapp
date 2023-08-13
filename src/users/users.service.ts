import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { User } from './entity/User';

const { google } = require('googleapis');
const sheetId = '1Oahej8yuEHfDsQI-AwycEpQ0CnjkMsxOMg2ywMKnjsg'
const tabName = 'Horoscope'
const range = 'A1:A23'
const serviceAccountKeyFile = "./service_account.json";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check if user exists
    const userExists = await this.findByUsername(
      createUserDto.username,
    );

    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    
    // Check if email exists
    const emailExists = await this.findByEmail(
      createUserDto.email,
    );

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update( id: string, updateUserDto: UpdateUserDto ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    // Generating google sheet client
    const googleSheetClient = await this.getGoogleSheetClient();

    // Reading Google Sheet from a specific range
    const data = await this.readGoogleSheet(googleSheetClient, sheetId, tabName, range);
    var bod = new Date("June 28");
    const result = data.find(({ dateRange1, dateRange2 }) => {
      const start = new Date(dateRange1);
      const end = new Date(dateRange2);
      return start <= bod && end > bod;
    });
    console.log(result);
    console.log(result.horoscopes);
    console.log(result.zodiacs);
    
    return this.userModel.find().exec();
  }

  async getGoogleSheetClient() {
    const vers = 'v4'
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
      version: vers,
      auth: authClient,
    });
  }
  
  async readGoogleSheet(googleSheetClient, sheetId, tabName, range) {
    const res = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tabName}!${range}`,
      majorDimension: "ROWS",
      valueRenderOption: "FORMATTED_VALUE"
    });

    var pattern = /[-.&$#![\]{}"']+/g;
    var pattern1 = /[^a-zA-Z0-9\:(),]/g;
    var pattern2 = /\s+/g;
    var regExpZodiac = /\(([^)]+)\)/;

    const resp = res.data.values;
    const filter = resp.filter(value => Object.keys(value).length !== 0);
    const str = JSON.stringify("[" + filter + "]").replace(pattern, '').replace(pattern1, ' ').replace(pattern2, ' ').trim();
    const newStr = str.replace(/\s*,\s*/g, ",");

    const result = newStr.split(',').reduce((prev, data) => {
      const zodiacs = data.split(' ')[0];
      const horoscopes = regExpZodiac.exec(data)[1];
      const date = data.slice(data.indexOf(':') + 1);
      const month1 = date.split(' ')[1];
      const date1 = date.split(' ')[2];
      const month2 = date.split(' ')[3];
      const date2 = date.split(' ')[4];
      const dateRange1 = month1.concat(" ", date1);
      const dateRange2 = month2.concat(" ", date2);
      
      return [
        ...prev,
        {
          horoscopes,
          zodiacs,
          dateRange1,
          dateRange2
        },
      ];
    }, []);
    
    return result;
  }
}
