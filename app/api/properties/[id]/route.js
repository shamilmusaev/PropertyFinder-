import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

//GET /api/properties/:id
export const GET = async (request, { params}) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if(!property) return new Response("Property not found", { status: 404 });

    return Response.json(property);
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};



//DELETE /api/properties/:id
export const DELETE = async (request, { params}) => {
  try {
    const propertId = params.id
     
    const sessionsUser = await getSessionUser()

    // Check for session
    if(!sessionsUser || !sessionsUser.userId){
      return new Response('User ID is required', {status: 401})
    }

    const {userId} = sessionsUser

    await connectDB();

    const property = await Property.findById(propertId);
    if(!property) return new Response("Property not found", { status: 404 });

    // Verify ownership
    if(property.owner.toString() !== userId){
      return newResponse("Unauthorized", {status: 401})
    }

    await property.deleteOne();

    return new Response('Property Deleted', {status: 200});
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
