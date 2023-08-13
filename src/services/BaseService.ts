import IAuthUser from "../interfaces/IAuthUser";

export default class BaseService{
    protected get user(): IAuthUser | null{
        const item = localStorage.getItem("user");
    
        if (item) {
          return JSON.parse(item);
        }
    
        return null;
      }
}