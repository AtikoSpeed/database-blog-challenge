const prisma = require("./db.js");

async function getUsers() {
  const response = await prisma.user.findMany();
  // console.log(response);
}

async function getUserPosts(givenId) {
  const response = await prisma.post.findMany({
    where: { userId: givenId },
  });
  // console.log(response);
}

async function getUserAndProfile(givenId) {
  const [user] = await prisma.user.findMany({ where: { id: givenId } });
  // console.log(user);
  const profile = await prisma.profile.findMany({ where: { userId: user.id } });
  // console.log(profile);
}

async function updatePost(postId, newContent) {
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { content: newContent },
  });
  // console.log(updatedPost);
}

async function deletePost(postId) {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  console.log(deletedPost);
}

getUsers();
getUserPosts(2);
getUserAndProfile(1);
updatePost(1, "With your lips");
deletePost(3);
