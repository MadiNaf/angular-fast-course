import { db } from 'src/main';

export default abstract class DbHelper {

  public static selectAll(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) =>  {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  public static insertOrUpdate(query: string, values: Array<string>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        db.run(query, values);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

}