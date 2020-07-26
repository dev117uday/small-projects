from django.shortcuts import render, get_object_or_404
from django.views.generic import(
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView )
from django.contrib.auth.mixins import(
    LoginRequiredMixin,
    UserPassesTestMixin,
    )
from .models import Post
from django.contrib.auth.models import User
from django.shortcuts import render


class PostListView(ListView):
    model = Post
    context_object_name = 'posts'
    ordering = ['-date_posted']
    template_name = 'webapp/index.html'
    paginate_by = 5

class PostDetailView(DetailView):
    model = Post


class PostCreateView(LoginRequiredMixin,CreateView):
    model = Post
    fields = ['title','content']
    def form_valid(self,form):
        form.instance.author = self.request.user
        return super().form_valid(form) #to give access to function in the base classs

class PostUpdateView(LoginRequiredMixin,UserPassesTestMixin,UpdateView):
    model = Post
    fields = ['title','content']

    def form_valid(self,form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class PostDeleteView(LoginRequiredMixin,UserPassesTestMixin,DeleteView):
    model = Post    
    success_url = '/'
    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class UserPostListView(ListView):
    model = Post
    context_object_name = 'posts'

    template_name = 'users/user_post.html'
    paginate_by = 10

    def get_query_set(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=username).order_by('-date_posted')

def rss_feed_to_object(request):
 
    object = {
        'data' : [
        {
            'msg':'hello'
        },
        {
            'msg':'hello'
        }
    ],
    }

    return render(request,'webapp/demo.html',object)